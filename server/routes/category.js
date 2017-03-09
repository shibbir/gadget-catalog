const fs = require('fs');
const async = require('async');

const Category = require('../models/category');

module.exports = function(app, passport, cloudinary) {
    app.get('/api/categories', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Category.find({}).populate('items').exec(function(err, docs) {
            if(err) {
                return res.sendStatus(500);
            }

            res.json(docs);
        });
    });

    app.get('/api/categories/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Category.findOne({ _id: req.params.id }).exec(function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            res.json(doc);
        });
    });

    app.put('/api/categories/:id', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        Category.findOne({ _id: req.params.id }, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            doc.name = req.body.name;

            async.waterfall([
                function(callback) {
                    if(!req.file) {
                        return callback();
                    }

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
                        callback();
                    }, { folder: 'categories' });
                }
            ], function () {
                doc.save();
                res.json(doc);
            });
        });
    });
};
