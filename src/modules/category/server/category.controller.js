const fs = require("fs");
const async = require("async");
const Category = require("./category.model");
const cloudinary = require("../../../config/server/lib/cloudinary")();
const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getCategory(req, res) {
    const doc = await Category.findOne({ _id: req.params.id });
    res.json(doc);
}

async function getCategories(req, res) {
    const docs = await Category.find({}).populate({
        path: "items",
        select: "_id",
        options: { lean: true }
    }).sort("name");

    res.json(docs);
}

function createCategory(req, res) {
    let model = new Category({
        name: req.body.name,
        slug: convertToSlug(req.body.name),
        createdBy: req.user._id
    });

    async.waterfall([
        function(callback) {
            if(!req.files) {
                return callback(null);
            }

            const file = req.files[0];

            cloudinary.uploader.upload(file.path, function(response) {
                model.file = {...response, active: true};
                fs.unlinkSync(file.path);
                callback(null);
            }, { folder: "categories", invalidate: true });
        }
    ], function(err) {
        if(err) return res.sendStatus(500);

        model.save(function(err, doc) {
            if(err) return res.sendStatus(500);

            res.json(doc);
        });
    });
}

function updateCategory(req, res) {
    Category.findOne({ _id: req.params.id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(404).json("Category not found.");
        }

        doc.name = req.body.name;
        doc.slug = convertToSlug(req.body.name);

        let oldFile = null;

        async.waterfall([function(callback) {
            if(!req.files) {
                return callback(null);
            }

            const file = req.files[0];

            oldFile = doc.file;

            cloudinary.uploader.upload(file.path, function(response) {
                doc.file = {...response, active: true};
                fs.unlinkSync(file.path);
                callback(null);
            }, { folder: "categories" });
        }, function(callback) {
            if(!oldFile) {
                return callback(null);
            }

            cloudinary.uploader.destroy(oldFile.public_id, function() {
                callback(null);
            }, { invalidate: true });

        }], function(err) {
            if(err) return res.sendStatus(500);

            doc.save();
            res.json(doc);
        });
    });
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
