const fs = require("fs");
const path = require("path");
const async = require("async");
const validator = require("validator");
const { format, parseISO } = require("date-fns");

const Item = require("./item.model");
const cloudinary = require(path.join(process.cwd(), "src/config/server/lib/cloudinary"));

async function getItem(req, res) {
    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, createdBy: req.user._id };

    try {
        const doc = await Item.findOne(query).populate("brand", "name").populate("category", "name").populate("retailer", "name").exec();

        if(!doc) return res.sendStatus(404);

        if(doc.description) {
            doc.description = validator.unescape(doc.description);
        }

        res.json(doc);
    } catch(err) {
        return res.status(500).send(err.stack);
    }
}

async function getItems(req, res) {
    const page = req.query.page ? +req.query.page : 1;
    const limit = 20;
    const skip = page > 0 ? ((page - 1) * limit) : 0;

    const query = req.user.role === "admin" ? {} : { createdBy: req.user._id };

    if(req.query.categoryId) {
        query.categoryId = req.query.categoryId;
    }

    if(req.query.brandId) {
        query.brandId = req.query.brandId;
    }

    if(req.query.startDate && req.query.endDate) {
        query.purchaseDate = {
            $gte: format(parseISO(req.query.startDate), "y-MM-d"),
            $lte: format(parseISO(req.query.endDate), "y-MM-d")
        };
    }

    try {
        const count = await Item.where(query).countDocuments();
        const docs = await Item.find(query).sort({ purchaseDate: "descending" }).skip(skip).limit(limit);

        res.json({
            metadata: {
                limit,
                currentPage: page,
                pageCount: Math.ceil(count / limit),
                totalCount: count
            },
            data: docs
        });
    } catch (err) {
        if(err) res.sendStatus(500);
    }
}

function createItem(req, res) {
    const item = new Item({
        name: req.body.name,
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        purchaseDate: req.body.purchaseDate,
        price: req.body.price,
        currency: req.body.currency,
        createdBy: req.user._id
    });

    if(req.body.retailerId) item.retailerId = req.body.retailerId;
    if(req.body.description) item.description = validator.escape(req.body.description);

    async.waterfall([
        function(callback) {
            if(!req.files || !req.files.length) return callback();

            req.files.forEach(function(file, index) {
                cloudinary.v2.uploader.upload(file.path, {
                    folder: "gadgets"
                }, function(error, result) {
                    if(error) return callback(error);

                    item.files.push({ ...result });

                    fs.unlinkSync(file.path);

                    if(index === req.files.length -1) {
                        item.files[0].active = true;
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

        if(!doc) return res.sendStatus(404);

        doc.name = req.body.name;
        doc.categoryId = req.body.categoryId;
        doc.brandId = req.body.brandId;
        doc.purchaseDate = req.body.purchaseDate;
        doc.price = req.body.price;
        doc.currency = req.body.currency;

        if(req.body.retailerId) doc.retailerId = req.body.retailerId;
        if(req.body.description) doc.description = validator.escape(req.body.description);

        async.waterfall([
            function(callback) {
                if(!req.files || !req.files.length) {
                    return callback();
                }

                req.files.forEach(function(file, index) {
                    cloudinary.v2.uploader.upload(file.path, {
                        folder: "gadgets"
                    }, function(error, result) {
                        doc.files.push({
                            ...result
                        });

                        fs.unlinkSync(file.path);

                        if(index === req.files.length -1) {
                            doc.files[0].active = true;
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

        if(!doc) return res.sendStatus(404);

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
            Item.findOne({ _id: req.params.itemId, createdBy: req.user._id }, "files", function(err, doc) {
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
            Item.findOneAndUpdate({ _id: req.params.itemId, createdBy: req.user._id, "files._id": req.params.fileId }, {
                $set: { "files.$.active": true }
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

        if(!doc) return res.sendStatus(404);

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

async function getItemCountByYearRange(req, res) {
    const startYear = req.query.startYear;
    const endYear = req.query.endYear;

    try {
        const docs = await Item.find({
            createdBy: req.user._id,
            purchaseDate: { $lte: new Date(endYear, 11, 31), $gte: new Date(startYear, 0, 1)}
        }, "purchaseDate");

        let data = {};

        docs.forEach(function(doc) {
            data[doc.purchaseDate.getFullYear()] = data[doc.purchaseDate.getFullYear()] !== undefined ? ++data[doc.purchaseDate.getFullYear()] : 1;
        });

        res.json(data);
    } catch(err) {
        if(err) res.sendStatus(500);
    }
}

exports.getItem = getItem;
exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;
exports.getItemCountByYearRange = getItemCountByYearRange;
