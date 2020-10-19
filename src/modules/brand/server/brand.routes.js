const controller = require("./brand.controller");
const { jwtAuthentication } = require("../../core/server/authorize.middleware");

module.exports = function (app) {
    app.route("/api/brands")
        .get(jwtAuthentication, controller.getBrands)
        .post(jwtAuthentication, controller.createBrand);

    app.route("/api/brands/:id")
        .get(jwtAuthentication, controller.getBrand)
        .put(jwtAuthentication, controller.updateBrand);
};
