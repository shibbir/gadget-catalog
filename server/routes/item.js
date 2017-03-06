const fs = require('fs');
const async = require('async');
const validator = require('validator');

const Item = require('../models/item');
const File = require('../models/sub-documents/file');

module.exports = function(app, passport, cloudinary) {
    app.get('/api/items', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        const page = req.query.page ? +req.query.page : 1;
        const size = req.query.size ? +req.query.size : 10;
        const skip = page > 0 ? ((page - 1) * size) : 0;

        const filterBy = req.query.filter_by;
        const filterId = req.query.filter_id;

        let query = {};

        if(filterBy && filterBy.toLowerCase() === 'category') {
            query = { categoryId: filterId }
        } else if(filterBy && filterBy.toLowerCase() === 'brand') {
            query = { brandId: filterId }
        }

        Item.where(query).count(function(err, count) {
            if (err) {
                return res.sendStatus(500);
            }

            Item.find(query).skip(skip).limit(size).populate('category', 'name').populate('brand', 'name').exec(function(err, docs) {
                if(err) {
                    return res.sendStatus(500);
                }

                docs = docs.map(function(doc) {
                    doc.brand = doc.brand[0];
                    doc.category = doc.category[0];
                    return doc;
                });

                res.json({
                    pagination: {
                        page,
                        pages: Math.ceil(count / size)
                    },
                    data: docs
                });
            });
        });
    });

    app.get('/api/items/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item
            .findOne({ _id: req.params.id })
            .populate('brand', 'name')
            .populate('category', 'name')
            .exec(function(err, doc) {
                if(err) {
                    return res.sendStatus(500);
                }

                doc.description = validator.unescape(doc.description);
                doc.category = doc.category[0];
                doc.brand = doc.brand[0];

                res.json(doc);
        });
    });

    app.post('/api/items', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        let item = new Item({
            name: req.body.name,
            description: validator.escape(req.body.description),
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
            purchaseDate: req.body.purchaseDate,
            price: req.body.price
        });

        async.waterfall([
            function(callback) {
                if(!req.file) {
                    return callback(null);
                }

                cloudinary.uploader.upload(req.file.path, function(response) {
                    const { public_id, resource_type, type, format } = response;

                    item.files = [{
                        public_id,
                        resource_type,
                        type,
                        format,
                        active: true
                    }];

                    fs.unlinkSync(req.file.path);

                    callback(null);
                }, { folder: 'gadgets', invalidate: true });
            }
        ], function (err) {
            if(err) {
                return res.sendStatus(500);
            }

            item.save(function(err, doc) {
                if(err) {
                    return res.sendStatus(500);
                }

                res.json(doc);
            });
        });
    });

    app.put('/api/items/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item.findOne({ _id: req.params.id }, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            doc.name = req.body.name;
            doc.description = validator.escape(req.body.description);
            doc.categoryId = req.body.categoryId;
            doc.brandId = req.body.brandId;
            doc.purchaseDate = req.body.purchaseDate;
            doc.price = req.body.price;

            doc.files = doc.files.map(function(x) {
                x.active = false;
                return x;
            });

            async.waterfall([
                function(callback) {
                    if(!req.file) {
                        return callback();
                    }

                    cloudinary.uploader.upload(req.file.path, function(result) {
                        const { public_id, resource_type, type, format } = result;

                        doc.files.push({
                            public_id,
                            resource_type,
                            type,
                            format,
                            active: true
                        });

                        callback();
                    }, { folder: 'gadgets' });
                }
            ], function () {
                doc.save();
                res.json(doc);
            });
        });
    });

    app.put('/api/items/:itemId/images/:fileId', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        async.waterfall([
            function(callback) {
                Item.findOne({ _id: req.params.itemId }, 'files', function(err, doc) {
                    if(err) {
                        return callback(err);
                    }

                    doc.files = doc.files.map(function(x) {
                        x.active = false;
                        return x;
                    });

                    doc.save(function() {
                        callback();
                    });
                });
            }, function(callback) {
                Item.findOneAndUpdate({ _id: req.params.itemId, 'files._id': req.params.fileId }, {
                    $set: {
                        'files.$.active': true
                    }
                }, { new: true }, function(err, doc) {
                    if(err) {
                        return callback(err);
                    }
                    callback(null, doc);
                });
            }
        ], function(err, result) {
            if(err) {
                return res.sendStatus(500);
            }
            res.json(result);
        });
    });

    app.delete('/api/items/:itemId/images/:fileId', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Item.findOne({ _id: req.params.itemId }, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            let file = doc.files.id(req.params.fileId);
            doc.files.id(req.params.fileId).remove();

            async.waterfall([
                function(callback) {
                    cloudinary.uploader.destroy(file.public_id, function() {
                        callback();
                    }, { invalidate: true });
                }
            ], function (err) {
                if(err) {
                    return res.sendStatus(500);
                }

                doc.save();
                res.json(doc);
            });
        });
    });
};