const passport = require("passport");
const controller = require("./user.controller");
const { jwtAuthentication, generateAccessToken } = require("../../core/server/authorize.middleware");

module.exports = function(app) {
    app.post("/api/register", controller.register);

    app.post("/api/login", controller.login);

    app.get("/api/logout", jwtAuthentication, controller.logout);

    app.get("/api/profile", jwtAuthentication, controller.getSignedInUserProfile);

    app.put("/api/profile/change-password", jwtAuthentication, controller.changePassword);

    app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

    app.get("/auth/facebook/callback", function(req, res, next) {
        passport.authenticate("facebook", function(err, user) {
            if(err) {
                return res.redirect(`/?provider=facebook&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true,
                signed: true
            }).redirect("/");
        })(req, res, next);
    });

    app.post("/auth/facebook/deauthorize-callback", function(req, res) {
        res.sendStatus(200);
    });

    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get("/auth/google/callback", function(req, res, next) {
        passport.authenticate("google", function(err, user) {
            if(err) {
                return res.redirect(`/?provider=google&error=${err.message}`);
            }

            res.cookie("access_token", generateAccessToken(user), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true,
                signed: true
            }).redirect("/");
        })(req, res, next);
    });

    app.put("/api/auth/disconnect", jwtAuthentication, controller.disconnect);

    app.post("/api/forgot-password", controller.forgotPassword);

    app.put("/api/reset-password", controller.resetPassword);

    app.post("/auth/facebook/data-deletion-request-callback", function(req, res) {
        const { signed_request } = req.body;

        const [ encoded_signature, payload ] = signed_request.split(".", 2);

        res.json({
            url: "https://gadget-catalog-io.herokuapp.com/",
            confirmation_code: ""
        });
    });
};
