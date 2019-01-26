module.exports = function (app, passport) {
    const controller = require('./brand.controller');

    app.route('/api/brands')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getBrands)
        .post(passport.authenticate('http-bearer', { session: false }), controller.createBrand);

    app.route('/api/brands/:id')
        .get(passport.authenticate('http-bearer', { session: false }), controller.getBrand)
        .put(passport.authenticate('http-bearer', { session: false }), controller.updateBrand);
};
