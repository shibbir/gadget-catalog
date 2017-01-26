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
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
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

    app.put('/api/items/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item.findOne({ _id: req.params.id }, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.category = req.body.category;
            doc.brand = req.body.brand;
            doc.purchaseDate = req.body.purchaseDate;
            doc.price = req.body.price;

            if(req.file) {
                doc.file = req.file.filename;
            }

            doc.save();

            res.json(doc);
        });
    });
};
