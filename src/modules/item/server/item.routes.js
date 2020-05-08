const passport = require("passport");

module.exports = function(app) {
    const controller = require("./item.controller");

    app.route("/api/items")
        .get(passport.authenticate("jwt", { session: false }), controller.getItems)
        .post(passport.authenticate("jwt", { session: false }), controller.createItem);

    app.route("/api/items/:id")
        .get(passport.authenticate("jwt", { session: false }), controller.getItem)
        .put(passport.authenticate("jwt", { session: false }), controller.updateItem)
        .delete(passport.authenticate("jwt", { session: false }), controller.deleteItem);

    app.route("/api/items/:itemId/images/:fileId")
        .put(passport.authenticate("jwt", { session: false }), controller.updateImage)
        .delete(passport.authenticate("jwt", { session: false }), controller.deleteImage);

    app.route("/api/items/yearRange/:yearRange")
        .get(passport.authenticate("jwt", { session: false }), controller.getYearRangeReport);
};
