const authorize = require("../../core/server/authorize");

module.exports = function(app) {
    const controller = require("./category.controller");

    app.route("/api/categories")
        .get(authorize(), controller.getCategories)
        .post(authorize(["admin"]), controller.createCategory);

    app.route("/api/categories/:id")
        .get(authorize(["admin"]), controller.getCategory)
        .put(authorize(["admin"]), controller.updateCategory);
};
