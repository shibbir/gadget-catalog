const Brand = require("./brand.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getBrand(req, res, next) {
    try {
        const doc = await Brand.findOne({ _id: req.params.id, createdBy: req.user._id }).exec();

        if(!doc) {
            return res.status(404).send("Brand not found.");
        }

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function getBrands(req, res, next) {
    const admin = await User.findOne({ role: "admin" });

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
        next(err);
    }
}

async function createBrand(req, res, next) {
    try {
        const model = await Brand.create({
            name: req.body.name,
            slug: convertToSlug(req.body.name),
            createdBy: req.user._id
        });

        res.json(model);
    } catch(err) {
        next(err);
    }
}

async function updateBrand(req, res, next) {
    try {
        let doc = await Brand.findOne({ name: req.body.name });

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400).send("Brand name already exists.");
        }

        doc = await Brand.findOne({ _id: req.params.id, createdBy: req.user._id });

        if(!doc) return res.sendStatus(404);

        doc.name = req.body.name;
        doc.slug = convertToSlug(req.body.name);

        doc.save();
        res.json(doc);
    } catch(err) {
        next(err);
    }
}

exports.getBrand = getBrand;
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
