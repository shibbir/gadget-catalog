let Item = require('../models/item');

module.exports = function(app, passport) {
    app.get('/api/items/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item.findOne({ _id: req.params.id }, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            res.json(doc);
        });
    });

    app.post('/api/items', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        let model = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            purchaseDate: req.body.purchaseDate,
            price: req.body.price
        };

        if(req.file) {
            model.file = req.file.filename;
        }

        new Item(model).save(function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            res.json(doc);
        });
    });
};
