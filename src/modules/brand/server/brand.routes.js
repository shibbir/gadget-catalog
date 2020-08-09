const passport = require("passport");
const controller = require("./brand.controller");

module.exports = function (app) {
    app.route("/api/brands")
        .get(passport.authenticate("jwt", { session: false }), controller.getBrands)
        .post(passport.authenticate("jwt", { session: false }), controller.createBrand);

    app.route("/api/brands/:id")
        .get(passport.authenticate("jwt", { session: false }), controller.getBrand)
        .put(passport.authenticate("jwt", { session: false }), controller.updateBrand);
};
