const Category = require("./category.model");
const User = require("../../user/server/user.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getCategory(req, res) {
    const doc = await Category.findOne({ _id: req.params.id });
    res.json(doc);
}

async function getCategories(req, res) {
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
}

async function createCategory(req, res) {
    try {
        let model = new Category({
            name: req.body.name,
            slug: convertToSlug(req.body.name),
            description: req.body.description,
            createdBy: req.user._id
        });

        model = await model.save();

        res.json(model);
    } catch(err) {
        res.sendStatus(500);
    }
}

function updateCategory(req, res) {
    Category.findOne({ _id: req.params.id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(doc && doc._id.toString() !== req.params.id) {
            return res.status(400).send("Category name already exists.");
        }

        Category.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.sendStatus(404);
            }

            doc.name = req.body.name;
            doc.slug = convertToSlug(req.body.name);
            doc.description = req.body.description;

            doc.save();
            res.json(doc);
        });
    });
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
