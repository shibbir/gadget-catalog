module.exports = function(app, passport) {
    const controller = require("./category.controller");

    app.route("/api/categories")
        .get(passport.authenticate("jwt", { session: false }), controller.getCategories)
        .post(passport.authenticate("jwt", { session: false }), controller.createCategory);

    app.route("/api/categories/:id")
        .get(passport.authenticate("jwt", { session: false }), controller.getCategory)
        .put(passport.authenticate("jwt", { session: false }), controller.updateCategory);
};
