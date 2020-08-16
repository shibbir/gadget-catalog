const passport = require("passport");
const controller = require("./vendor.controller");

module.exports = function (app) {
    app.route("/api/vendors")
        .get(passport.authenticate("jwt", { session: false }), controller.getVendors)
        .post(passport.authenticate("jwt", { session: false }), controller.createVendor);
};
