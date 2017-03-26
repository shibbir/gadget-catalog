module.exports = function(app, passport) {
    const controller = require('../controllers/item.controller');

    app.route('/api/items')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getItems)
        .post(passport.authenticate('http-bearer', { session: false }), controller.createItem);

    app.route('/api/items/:id')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getItem)
        .put(passport.authenticate('http-bearer', { session: false }), controller.updateItem);

    app.route('/api/items/:itemId/images/:fileId')
        .put(passport.authenticate('http-bearer', { session: false }), controller.updateImage)
        .delete(passport.authenticate('http-bearer', { session: false }), controller.deleteImage);

    app.route('/api/items/yearRange/:yearRange')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getYearRangeReport);
};
