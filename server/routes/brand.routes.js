module.exports = function (app, passport) {
    const controller = require('../controllers/brand.controller');

    app.route('/api/brands').get(passport.authenticate('http-bearer', { session: false }), controller.getBrands);
};
