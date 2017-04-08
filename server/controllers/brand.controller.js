const Brand = require('../models/brand.model');

function getBrands(req, res) {
    Brand.find({
        $or: [{ createdBy: req.user._id }, { createdBy: req.authInfo.adminId }]
    })
    .sort('name')
    .exec(function(err, docs) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(docs);
    });
}

exports.getBrands = getBrands;
