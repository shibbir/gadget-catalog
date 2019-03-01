const fs = require('fs');
const async = require('async');
const validator = require('validator');
const Item = require('./item.model');
const File = require('../core/file.model');
const cloudinary = require('../config/lib/cloudinary')();

function getItem(req, res) {
    Item
        .findOne({ _id: req.params.id, createdBy: req.user._id })
        .populate('brand', 'name')
        .populate('category', 'name')
        .exec(function(err, doc) {
            if(err) return res.sendStatus(500);

            if(!doc) {
                return res.status(400).json({ message: 'Operation failed or you don\'t have the permission!'});
            }

            doc = doc.toJSON();

            if(doc.description) {
                doc.description = validator.unescape(doc.description);
            }
            doc.category = doc.category[0];
            doc.brand = doc.brand[0];

            res.json(doc);
    });
}

function getItems(req, res) {
    const page = req.query.page ? +req.query.page : 1;
    const size = req.query.size ? +req.query.size : 15;
    const skip = page > 0 ? ((page - 1) * size) : 0;

    let query = {
        createdBy: req.user._id
    };

    if(req.query.categoryId) {
        query.categoryId = req.query.categoryId;
    }

    if(req.query.brandId) {
        query.brandId = req.query.brandId;
    }

    Item.where(query).countDocuments(function(err, count) {
        if (err) return res.sendStatus(500);

        Item.find(query).sort({ purchaseDate: 'descending' }).skip(skip).limit(size).exec(function(err, docs) {
            if(err) return res.sendStatus(500);

            res.json({
                pagination: {
                    page,
                    pages: Math.ceil(count / size)
                },
                data: docs
            });
        });
    });
}

function createItem(req, res) {
    let item = new Item({
        name: req.body.name,
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        purchaseDate: req.body.purchaseDate,
        price: req.body.price,
        createdBy: req.user._id
    });

    if(req.body.description) {
        item.description = validator.escape(req.body.description);
    }

    async.waterfall([
        function(callback) {
            if(!req.files || !req.files.length) {
                return callback();
            }

            req.files.forEach(function(file, index) {
                cloudinary.v2.uploader.upload(file.path, {
                    folder: 'gadgets'
                }, function(error, result) {
                    item.files.push({
                        ...result,
                        active: true
                    });

                    fs.unlinkSync(file.path);

                    if(index === req.files.length -1) {
                        callback();
                    }
                });
            });
        }
    ], function(err) {
        if(err) return res.sendStatus(500);

        item.save(function(err, doc) {
            if(err) return res.sendStatus(500);

            res.json(doc);
        });
    });
}

function updateItem(req, res) {
    Item.findOne({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: 'No item was found!' });
        }

        doc.name = req.body.name;
        doc.categoryId = req.body.categoryId;
        doc.brandId = req.body.brandId;
        doc.purchaseDate = req.body.purchaseDate;
        doc.price = req.body.price;

        if(req.body.description) {
            doc.description = validator.escape(req.body.description);
        }

        async.waterfall([
            function(callback) {
                if(!req.files || !req.files.length) {
                    return callback();
                }

                req.files.forEach(function(file, index) {
                    cloudinary.v2.uploader.upload(file.path, {
                        folder: 'gadgets'
                    }, function(error, result) {
                        doc.files.push({
                            ...result,
                            active: true
                        });

                        fs.unlinkSync(file.path);

                        if(index === req.files.length -1) {
                            callback();
                        }
                    });
                });
            }
        ], function() {
            doc.save();
            res.json(doc);
        });
    });
}

function deleteItem(req, res) {
    Item.findOneAndRemove({ _id: req.params.id, createdBy: req.user._id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: 'No item was found!' });
        }

        if(!doc.files || !doc.files.length) {
            return res.sendStatus(200);
        }

        let files = [];

        doc.files.forEach(function(file) {
            files.push(file.public_id);
        });

        cloudinary.v2.api.delete_resources(files, function(err) {
            if(err) return res.sendStatus(500);

            res.sendStatus(200);
        });
    });
}

function updateImage(req, res) {
    async.waterfall([
        function(callback) {
            Item.findOne({ _id: req.params.itemId, createdBy: req.user._id }, 'files', function(err, doc) {
                if(err) return callback(err);

                if(!doc) return callback();

                doc.files = doc.files.map(function(x) {
                    x.active = false;
                    return x;
                });

                doc.save(function() {
                    callback();
                });
            });
        }, function(callback) {
            Item.findOneAndUpdate({ _id: req.params.itemId, createdBy: req.user._id, 'files._id': req.params.fileId }, {
                $set: { 'files.$.active': true }
            }, { new: true }, function(err, doc) {
                if(err) return callback(err);
                callback(null, doc);
            });
        }
    ], function(err, result) {
        if(err) return res.sendStatus(500);
        res.json(result);
    });
}

function deleteImage(req, res) {
    Item.findOne({ _id: req.params.itemId, createdBy: req.user._id }, function(err, doc) {
        if(err) return res.sendStatus(500);

        if(!doc) {
            return res.status(400).json({ message: 'Invalid request!'});
        }

        let file = doc.files.id(req.params.fileId);

        cloudinary.v2.uploader.destroy(file.public_id, {
            invalidate: true
        }, function(err) {
            if(err) return res.sendStatus(500);

            doc.files.id(req.params.fileId).remove();
            doc.save();
            res.json(doc);
        });
    });
}

function getYearRangeReport(req, res) {
    const yearRange = req.params.yearRange.split('-');
    const startYear = yearRange[0];
    const endYear = yearRange[1];

    const query = {
        createdBy: req.user._id,
        purchaseDate: { $lte: new Date(endYear, 11, 31), $gte: new Date(startYear, 0, 1)}
    };

    Item.find(query, 'purchaseDate').exec(function(err, docs) {
        if(err) return res.sendStatus(500);

        let data = {};

        for(let i = startYear; i <= endYear; i++) {
            data[i] = 0;
        }

        docs.forEach(function(x) {
            data[`${x.purchaseDate.getFullYear()}`] = data[`${x.purchaseDate.getFullYear()}`] || 0;
            data[`${x.purchaseDate.getFullYear()}`]++;
        });

        res.json(data);
    });
}

exports.getItem = getItem;
exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;
exports.getYearRangeReport = getYearRangeReport;
