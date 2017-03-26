const Brand = require('../models/brand.model');

function getBrands(req, res) {
    Brand.find({}, function(err, docs) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(docs);
    });
}

exports.getBrands = getBrands;
