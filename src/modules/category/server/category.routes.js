const passport = require("passport");
const multer = require("../../../config/server/lib/multer");
const allowRoles = require("../../core/server/authorize.middleware");

module.exports = function(app) {
    const controller = require("./category.controller");

    app.route("/api/categories")
        .get(passport.authenticate("jwt", { session: false }), controller.getCategories)
        .post(passport.authenticate("jwt", { session: false }), allowRoles(["admin"]), multer.single("file"), controller.createCategory);

    app.route("/api/categories/:id")
        .get(passport.authenticate("jwt", { session: false }), allowRoles(["admin"]), controller.getCategory)
        .put(passport.authenticate("jwt", { session: false }), allowRoles(["admin"]), multer.single("file"), controller.updateCategory);
};
