const fs = require('fs');
const async = require('async');
const Category = require('./category.model');
const cloudinary = require('../config/lib/cloudinary')();
const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

function getCategory(req, res) {
    Category.findOne({ _id: req.params.id }).exec(function(err, doc) {
        if(err) return res.sendStatus(500);

        res.json(doc);
    });
}

function getCategories(req, res) {
    Category
        .find()
        .populate({
            path: 'items',
            match: { createdBy: req.user._id },
            select: '_id',
            options: { lean: true }
        })
        .sort('name')
        .exec(function(err, docs) {
            if(err) return res.sendStatus(500);
            res.json(docs);
        });
}

function createCategory(req, res) {
    if(req.user.role !== 'admin') {
        return res.sendStatus(401);
    }

    let model = new Category({
        name: req.body.name,
        slug: convertToSlug(req.body.name),
        createdBy: req.user._id
    });

    async.waterfall([
        function(callback) {
            if(!req.file) {
                return callback(null);
            }

            cloudinary.uploader.upload(req.file.path, function(response) {
                const { public_id, resource_type, type, format } = response;

                model.file = {
                    public_id,
                    resource_type,
                    type,
                    format,
                    active: true
                };

                fs.unlinkSync(req.file.path);

                callback(null);
            }, { folder: 'categories', invalidate: true });
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
    if(req.user.role !== 'admin') {
        return res.sendStatus(401);
    }

    Category.findOne({ _id: req.params.id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: 'Category not found.'});
        }

        doc.name = req.body.name;
        doc.slug = convertToSlug(req.body.name);

        let oldFile = null;

        async.waterfall([
            function(callback) {
                if(!req.file) {
                    return callback(null);
                }

                oldFile = doc.file;

                cloudinary.uploader.upload(req.file.path, function(result) {
                    const { public_id, resource_type, type, format } = result;

                    doc.file = {
                        public_id,
                        resource_type,
                        type,
                        format,
                        active: true
                    };

                    fs.unlinkSync(req.file.path);
                    callback(null);
                }, { folder: 'categories' });
            },
            function(callback) {
                if(!oldFile) {
                    return callback(null);
                }

                cloudinary.uploader.destroy(oldFile.public_id, function() {
                    callback(null);
                }, { invalidate: true });
            }
        ], function(err) {
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
