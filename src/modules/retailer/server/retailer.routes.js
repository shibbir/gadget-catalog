const passport = require("passport");
const controller = require("./retailer.controller");

module.exports = function (app) {
    app.route("/api/retailers")
        .get(passport.authenticate("jwt", { session: false }), controller.getRetailers)
        .post(passport.authenticate("jwt", { session: false }), controller.createRetailer);

    app.route("/api/retailers/:id")
        .get(passport.authenticate("jwt", { session: false }), controller.getRetailer)
        .put(passport.authenticate("jwt", { session: false }), controller.updateRetailer);
};
