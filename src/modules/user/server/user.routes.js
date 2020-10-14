const jwt = require("jsonwebtoken");
const passport = require("passport");
const controller = require("./user.controller");

function generateAccessToken(user) {
    return jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
        issuer: user._id.toString()
    });
}

module.exports = function(app) {
    app.post("/api/register", controller.register);

    app.post("/api/login", controller.login);

    app.get("/api/logout", passport.authenticate("jwt", { session: false }), controller.logout);

    app.get("/api/profile", passport.authenticate("jwt", { session: false }), controller.getSignedInUserProfile);

    app.put("/api/profile/change-password", passport.authenticate("jwt", { session: false }), controller.changePassword);

    app.get("/oauth/facebook", passport.authenticate("facebook", { scope: "email" }));

    app.get("/oauth/facebook/callback", function(req, res, next) {
        passport.authenticate("facebook", function(err, user) {
            if(err) {
                return res.redirect(`/?provider=facebook&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/");
        })(req, res, next);
    });

    app.post("/oauth/facebook/deauthorize-callback", function(req, res) {
        res.sendStatus(200);
    });

    app.get("/oauth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get("/oauth/google/callback", function(req, res, next) {
        passport.authenticate("google", function(err, user) {
            if(err) {
                return res.redirect(`/?provider=google&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/");
        })(req, res, next);
    });

    app.put("/api/oauth/disconnect", passport.authenticate("jwt", { session: false }), controller.disconnect);

    app.post("/api/forgot-password", controller.forgotPassword);

    app.put("/api/reset-password", controller.resetPassword);
};
