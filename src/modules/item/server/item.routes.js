const multer = require("../../../config/server/lib/multer");
const { jwtAuthentication } = require("../../core/server/authorize.middleware");

module.exports = function(app) {
    const controller = require("./item.controller");

    app.route("/api/items")
        .get(jwtAuthentication, controller.getItems)
        .post(jwtAuthentication, multer.array("files", 3), controller.createItem);

    app.route("/api/items/:itemId/images/:fileId")
        .put(jwtAuthentication, controller.updateImage)
        .delete(jwtAuthentication, controller.deleteImage);

    app.route("/api/items/item-count")
        .get(jwtAuthentication, controller.getItemCountByYearRange);

    app.route("/api/items/:id")
        .get(jwtAuthentication, controller.getItem)
        .put(jwtAuthentication, multer.array("files", 3), controller.updateItem)
        .delete(jwtAuthentication, controller.deleteItem);
};
