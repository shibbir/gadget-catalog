let Item = require('../models/item');

module.exports = function(app, passport) {
    app.get('/api/items/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item
            .findOne({ _id: req.params.id })
            .populate('brand', 'name')
            .populate('category', 'name')
            .exec(function(err, doc) {
                if(err) {
                    return res.sendStatus(500);
                }

                doc.category = doc.category[0];
                doc.brand = doc.brand[0];

                res.json(doc);
        });
    });

    app.post('/api/items', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        let model = {
            name: req.body.name,
            description: req.body.description,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
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
            doc.categoryId = req.body.categoryId;
            doc.brandId = req.body.brandId;
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
