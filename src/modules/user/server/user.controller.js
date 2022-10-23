const axios = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("./user.model");
const { generateAccessToken, generateRefreshToken } = require("../../core/server/authorize.middleware");

function formatProfile(user) {
    const profile = {
        _id: user._id,
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
}

async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const doc = await User.findOne({ $or: [
            { "local.email": email },
            { "facebook.email": email },
            { "google.email": email }
        ]});

        if(doc) {
            return res.status(400).send("This email address is already registered.");
        }

        const user = new User();

        user._id = new mongoose.Types.ObjectId();
        user.displayName = name;
        user.local.name = name;
        user.local.email = email;
        user.local.password = user.generateHash(password);
        user.local.refresh_token = generateRefreshToken(user);

        await user.save();

        res.cookie("access_token", generateAccessToken(user), { httpOnly: true, sameSite: true });
        res.cookie("refresh_token", user.local.refresh_token, { httpOnly: true, sameSite: true });

        res.json({
            name: name,
            isAdmin: false
        });
    } catch(err) {
        res.sendStatus(500);
    }
}

async function login(req, res, next) {
    try {
        let doc;
        const { username, password, grant_type, recaptchaToken } = req.body;

        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`);

        if(!response.data.success) return res.status(401).send("reCAPTCHA validation failed! Please try again.");

        if(!grant_type) return res.status(401).send("Invalid credentials.");

        if(grant_type === "password") {
            doc = await User.findOne({ "local.email": username });

            if(!doc || !doc.validPassword(password)) {
                return res.status(401).send("Invalid credentials.");
            }

            doc.local.refresh_token = generateRefreshToken(doc);
            await doc.save();
        }

        res.cookie("access_token", generateAccessToken(doc), { httpOnly: true, sameSite: true });
        res.cookie("refresh_token", doc.local.refresh_token, { httpOnly: true, sameSite: true });

        res.json(formatProfile(doc.toJSON()));
    } catch (err) {
        next(err);
    }
}

function logout(req, res) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token").redirect("/");
}

async function changePassword(req, res) {
    try {
        const doc = await User.findOne({ _id: req.user._id }, "local");

        if(!doc || !doc.validPassword(req.body.currentPassword)) {
            return res.status(400).send("Invalid password!");
        }

        doc.local.password = doc.generateHash(req.body.newPassword);
        doc.save();

        res.status(200).send("Password changed successfully.");
    } catch (err) {
        res.sendStatus(500);
    }
}

function forgotPassword(req, res, next) {
    User.findOne({ $or: [
        { "facebook.email" : req.body.email },
        { "google.email": req.body.email },
        { "local.email": req.body.email }
    ]}, function(err, doc) {
        if(err) return next(err);

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
                name: doc.displayName,
                url: `${req.headers.origin}/reset-password?token=${doc.local.resetPasswordToken}`
            }, function(err, html) {
                transporter.sendMail({
                    from: `"Gadget Catalog" <${process.env.MAILER_ADDRESS}>`,
                    to: req.body.email,
                    subject: "[Gadget Catalog] Password Reset Request",
                    html: html
                }, function (err) {
                    if(err) return next(err);

                    res.sendStatus(200);
                });
            });
        });
    });
}

async function resetPassword(req, res) {
    try {
        const doc = User.findOne({
            "local.resetPasswordToken": req.query.token,
            "local.resetPasswordExpires": {
                $gt: Date.now()
            }
        });

        if(!doc) return res.status(401).send("Account doesn't exist or the token has expired.");

        if(req.body.newPassword !== req.body.confirmNewPassword) return res.sendStatus(400);

        doc.local.password = doc.generateHash(req.body.newPassword);
        doc.save();

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
}

function getSignedInUserProfile(req, res) {
    res.json(formatProfile(req.user.toJSON()));
}

function disconnect(req, res) {
    if(!req.query.provider) return res.sendStatus(400);

    if(req.query.provider === "facebook") {
        axios.delete(`https://graph.facebook.com/${req.user.facebook.id}/permissions?access_token=${req.user.facebook.accessToken}`).then(() => {
            User.findOneAndUpdate({_id: req.user._id}, {$unset: {facebook: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
        }).catch(() => res.sendStatus(500));
    } else {
        User.findOneAndUpdate({_id: req.user._id}, {$unset: {google: 1 }}, {new: true}, (err, doc) => res.json(formatProfile(doc.toJSON())));
    }
}

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getSignedInUserProfile = getSignedInUserProfile;
exports.disconnect = disconnect;
