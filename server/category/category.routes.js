module.exports = function(app, passport) {
    const controller = require('./category.controller');

    app.route('/api/categories')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getCategories)
        .post(passport.authenticate('http-bearer', { session: false }), controller.createCategory);

    app.route('/api/categories/:id')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getCategory)
        .put(passport.authenticate('http-bearer', { session: false }), controller.updateCategory);
};
