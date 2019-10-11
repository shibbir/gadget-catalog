const axios = require("axios");
const jwt = require("jsonwebtoken");
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
                return res.sendStatus(401);
            }

            res.cookie("access_token", generateAccessToken(user, "local"), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json(formatProfile(user));
        });
    });

    app.get("/api/logout", passport.authenticate("jwt", { session: false }), function(req, res) {
        res.clearCookie("access_token").redirect("/");
    });

    app.get("/api/profile", passport.authenticate("jwt", { session: false }), function(req, res) {
        res.json(formatProfile(req.user.toJSON()));
    });

    app.put("/api/profile/password", passport.authenticate("jwt", { session: false }), function(req, res) {
        User.findOne({ _id: req.user._id }, "local", function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.currentPassword)) {
                return res.sendStatus(401);
            }

            user.local.password = user.generateHash(req.body.newPassword);
            user.save();

            res.json();
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
};
