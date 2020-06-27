const authorize = require("../../core/server/authorize");

module.exports = function(app) {
    const repository = require("./category.repository");

    app.route("/api/categories")
        .get(authorize(), repository.getCategories)
        .post(authorize(["admin"]), repository.createCategory);

    app.route("/api/categories/:id")
        .get(authorize(["admin"]), repository.getCategory)
        .put(authorize(["admin"]), repository.updateCategory);
};
