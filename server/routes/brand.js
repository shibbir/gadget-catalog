let Brand = require('../models/brand');

module.exports = function(app, passport) {
    app.get('/api/brands', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Brand.find({}, function(err, docs) {
            if(err) {
                return res.sendStatus(500);
            }

            res.json(docs);
        });
    });
};
