const cache = require('memory-cache');
const Brand = require('./brand.model');

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

function getBrand(req, res) {
    Brand.findOne({ _id: req.params.id, createdBy: req.user._id }).exec(function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: 'Brand not found or you don\'t have the permission.' });
        }

        res.json(doc);
    });
}

function getBrands(req, res) {
    let adminId = cache.get('adminId');

    const filterBy = req.query.filter_by;

    let query = {
        $or: [{ createdBy: req.user._id }, { createdBy: adminId }]
    };

    if(filterBy && filterBy.toLowerCase() === 'user') {
        query.createdBy = req.user._id;
    }

    Brand.find(query).sort('name').exec(function(err, docs) {
        if(err) return res.sendStatus(500);

        res.json(docs);
    });
}

function createBrand(req, res) {
    let model = new Brand({
        name: req.body.name,
        slug: convertToSlug(req.body.name),
        createdBy: req.user._id
    });

    model.save();

    res.json(model);
}

function updateBrand(req, res) {
    Brand.findOne({
        name: { $regex: req.body.name, $options: 'i' }
    }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400);
        }

        Brand.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.status(400);
            }

            doc.name = req.body.name;
            doc.slug = convertToSlug(req.body.name);

            doc.save();
            res.json(doc);
        });
    });
}

exports.getBrand = getBrand;
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
