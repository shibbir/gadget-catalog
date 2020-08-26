const passport = require("passport");
const multer = require("../../../config/server/lib/multer");

module.exports = function(app) {
    const controller = require("./item.controller");

    app.route("/api/items")
        .get(passport.authenticate("jwt", { session: false }), controller.getItems)
        .post(passport.authenticate("jwt", { session: false }), multer.array("files", 3), controller.createItem);

    app.route("/api/items/:itemId/images/:fileId")
        .put(passport.authenticate("jwt", { session: false }), controller.updateImage)
        .delete(passport.authenticate("jwt", { session: false }), controller.deleteImage);

    app.route("/api/items/item-count")
        .get(passport.authenticate("jwt", { session: false }), controller.getItemCountByYearRange);

    app.route("/api/items/:id")
        .get(passport.authenticate("jwt", { session: false }), controller.getItem)
        .put(passport.authenticate("jwt", { session: false }), multer.array("files", 3), controller.updateItem)
        .delete(passport.authenticate("jwt", { session: false }), controller.deleteItem);
};
