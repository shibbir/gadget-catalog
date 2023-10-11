const Category = require("./category.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getCategory(req, res, next) {
    try {
        const doc = await Category.findOne({ _id: req.params.id });
        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function getCategories(req, res, next) {
    try {
        const admin = await User.findOne({role: "admin"});

        const docs = await Category.find({ $or: [
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

async function createCategory(req, res, next) {
    try {
        const model = await Category.create({
            name: req.body.name,
            slug: convertToSlug(req.body.name),
            createdBy: req.user._id
        });

        res.json(model);
    } catch(err) {
        next(err);
    }
}

async function updateCategory(req, res, next) {
    try {
        let doc = await Category.findOne({ name: req.body.name });

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400).send("Category name already exists.");
        }

        doc = await Category.findOne({ _id: req.params.id });

        if(!doc) {
            return res.sendStatus(404);
        }

        doc.name = req.body.name;
        doc.slug = convertToSlug(req.body.name);

        await doc.save();
        res.json(doc);
    } catch(err) {
        next(err);
    }
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
