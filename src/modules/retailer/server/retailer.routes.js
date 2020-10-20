const controller = require("./retailer.controller");
const { jwtAuthentication } = require("../../core/server/authorize.middleware");

module.exports = function (app) {
    app.route("/api/retailers")
        .get(jwtAuthentication, controller.getRetailers)
        .post(jwtAuthentication, controller.createRetailer);

    app.route("/api/retailers/:id")
        .get(jwtAuthentication, controller.getRetailer)
        .put(jwtAuthentication, controller.updateRetailer);
};
