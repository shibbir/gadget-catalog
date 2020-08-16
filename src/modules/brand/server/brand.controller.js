const Brand = require("./brand.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getBrand(req, res) {
    try {
        const doc = await Brand.findOne({ _id: req.params.id, createdBy: req.user._id }).exec();

        if(!doc) {
            return res.status(404).send("Brand not found.");
        }

        res.json(doc);
    } catch(err) {
        res.sendStatus(500);
    }
}

async function getBrands(req, res) {
    const admin = await User.findOne({role: "admin"});

    try {
        const docs = await Brand.find({ $or: [
            { createdBy : req.user.id },
            { createdBy: admin.id }
        ]}).populate({
            path: "items",
            select: "_id",
            options: { lean: true },
            match: { createdBy: req.user._id }
        }).sort("name").lean();

        res.json(docs);
    } catch(err) {
        res.sendStatus(500);
    }
}

async function createBrand(req, res) {
    try {
        let model = new Brand({
            name: req.body.name,
            slug: convertToSlug(req.body.name),
            website: req.body.website,
            createdBy: req.user._id
        });

        model = await model.save();

        res.json(model);
    } catch(err) {
        res.sendStatus(500);
    }
}

function updateBrand(req, res) {
    Brand.findOne({ name: req.body.name }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400).send("Brand name already exists.");
        }

        Brand.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.sendStatus(404);
            }

            doc.name = req.body.name;
            doc.slug = convertToSlug(req.body.name);
            doc.website = req.body.website;

            doc.save();
            res.json(doc);
        });
    });
}

exports.getBrand = getBrand;
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
