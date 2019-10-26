const axios = require("axios");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./user.model");

function generateAccessToken(user, provider) {
    return jwt.sign({
        _id: user._id,
        name: user.displayName,
        email: user[provider].email
    }, process.env.TOKEN_SECRET,{
        expiresIn: "1d",
        issuer: user._id.toString()
    });
};

function formatProfile(user) {
    let profile = {
        name: user.displayName,
        isAdmin: user.role === "admin"
    };

    if(user.local) {
        profile.local = {
            email: user.local.email
        };
    }

    if(user.facebook) {
        profile.facebook = {
            email: user.facebook.email
        };
    }

    if(user.google) {
        profile.google = {
            email: user.google.email
        };
    }

    return profile;
};

module.exports = function(app, passport) {
    app.post("/api/register", function(req, res, next) {
        passport.authenticate("local-signup", function(err, user, info) {
            if(err || !user) {
                return res.status(400).json({ message: info.message });
            }

            res.cookie("access_token", generateAccessToken(user, "local"), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json({
                name: user.displayName,
                isAdmin: user.role === "admin"
            });
        })(req, res, next);
    });

    app.post("/api/login", function(req, res) {
        User.findOne({ "local.email": req.body.email }).exec(function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.password)) {
                return res.status(401).send("Invalid email or password.");
            }

            res.cookie("access_token", generateAccessToken(user, "local"), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json(formatProfile(user.toJSON()));
        });
    });

    app.get("/api/logout", passport.authenticate("jwt", { session: false }), function(req, res) {
        res.clearCookie("access_token").redirect("/");
    });

    app.get("/api/profile", passport.authenticate("jwt", { session: false }), function(req, res) {
        res.json(formatProfile(req.user.toJSON()));
    });

    app.put("/api/profile/changepassword", passport.authenticate("jwt", { session: false }), function(req, res) {
        User.findOne({ _id: req.user._id }, "local", function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.currentPassword)) {
                return res.sendStatus(400);
            }

            user.local.password = user.generateHash(req.body.newPassword);
            user.save();

            res.status(200).send("Password changed successfully.");
        });
    });

    app.get("/oauth/facebook", passport.authenticate("facebook", {scope: "email"}));

    app.get("/oauth/facebook/callback", function(req, res, next) {
        passport.authenticate("facebook", function(err, user) {
            if(err) {
                return res.redirect(`/#/?provider=facebook&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user, "facebook"), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/#/");
        })(req, res, next)
    });

    app.post("/oauth/facebook/deauthorize_callback", function(req, res) {
        res.sendStatus(200);
    });

    app.get("/oauth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get("/oauth/google/callback", function(req, res, next) {
        passport.authenticate("google", function(err, user) {
            if(err) {
                return res.redirect(`/#/?provider=google&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user, "google"), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/#/");
        })(req, res, next);
    });

    app.put("/api/oauth/disconnect", passport.authenticate("jwt", { session: false }), function(req, res) {
        if(!req.query.provider) return res.sendStatus(400);

        if(req.query.provider === "facebook") {
            axios.delete(`https://graph.facebook.com/${req.user.facebook.id}/permissions?access_token=${req.user.facebook.accessToken}`).then(() => {
                User.findOneAndUpdate({_id: req.user._id}, {$unset: {facebook: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
            }).catch(() => res.sendStatus(500));
        } else {
            User.findOneAndUpdate({_id: req.user._id}, {$unset: {google: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
        }
    });

    app.post("/api/forgotpassword", function(req, res) {
        User.findOne({ $or: [
            { "facebook.email" : req.body.email },
            { "google.email": req.body.email },
            { "local.email": req.body.email }
        ]}, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) return res.status(404).send("No account is associated with this email address.");

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                auth: {
                    user: process.env.MAILER_ADDRESS,
                    pass: process.env.MAILER_PASSWORD
                }
            });

            doc.local.resetPasswordToken = crypto.randomBytes(20).toString("hex");
            doc.local.resetPasswordExpires = Date.now() + 3600000;

            doc.save().then(function() {
                res.render("password-reset.html", {
                    url: `${process.env.BASE_URL}/#/reset-password?token=${doc.local.resetPasswordToken}`
                }, function(err, html) {
                    transporter.sendMail({
                        from: `"Gadget Catalog" <${process.env.MAILER_ADDRESS}>`,
                        to: req.body.email,
                        subject: "[Gadget Catalog] Password Reset Request",
                        html: html
                    }, function (err) {
                        if(err) return res.sendStatus(500);

                        res.sendStatus(200);
                    });
                });
            });
        });
    });

    app.put("/api/resetpassword", function(req, res) {
        User.findOne({
            "local.resetPasswordToken": req.query.token,
            "local.resetPasswordExpires": {
                $gt: Date.now()
            }
        }, function(err, doc) {
            if(!doc) return res.status(401).send("Account doesn't exist or the token has expired.");

            if(req.body.newPassword !== req.body.confirmNewPassword) return res.sendStatus(400);

            doc.local.password = doc.generateHash(req.body.newPassword);
            doc.save();

            res.sendStatus(200);
        });
    });
};
