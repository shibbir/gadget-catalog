const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("validator");
const { format, parseISO } = require("date-fns");

const Item = require("./item.model");
const { uploadToCloudinary, destroyFromCloudinary, deleteResourcesFromCloudinary, deleteFolderFromCloudinary } = require(path.join(process.cwd(), "src/config/server/lib/cloudinary"));

async function getItem(req, res, next) {
    const query = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, createdBy: req.user._id };

    try {
        const doc = await Item.findOne(query).populate("brand", "name").populate("category", "name").exec();

        if(!doc) return res.sendStatus(404);

        if(doc.description) {
            doc.description = validator.unescape(doc.description);
        }

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function getItems(req, res, next) {
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
    } catch(err) {
        next(err);
    }
}

async function createItem(req, res, next) {
    try {
        const _id = new mongoose.Types.ObjectId;

        const item = new Item({
            _id,
            name: req.body.name,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
            purchaseDate: req.body.purchaseDate,
            price: req.body.price,
            currency: req.body.currency,
            payee: req.body.payee,
            createdBy: req.user._id
        });

        if(req.body.description) item.description = validator.escape(req.body.description);

        if(req.files && req.files.images) {
            for(let i = 0; i < req.files.images.length; i++) {
                const file = req.files.images[i];
                const result = await uploadToCloudinary(file.path, { folder: `gadget-catalog/${_id}` });

                item.files.push({ ...result });

                fs.unlink(file.path);
            }
        }

        if(req.files && req.files.invoice) {
            for(let i = 0; i < req.files.invoice.length; i++) {
                const file = req.files.invoice[i];
                const result = await uploadToCloudinary(file.path, { folder: `gadget-catalog/${_id}` });

                item.invoice = result;

                fs.unlink(file.path);
            }
        }

        const doc = await item.save();

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function updateItem(req, res, next) {
    try {
        const doc = await Item.findOne({ _id: req.params.id, createdBy: req.user._id });

        if(!doc) return res.sendStatus(404);

        doc.name = req.body.name;
        doc.categoryId = req.body.categoryId;
        doc.brandId = req.body.brandId;
        doc.purchaseDate = req.body.purchaseDate;
        doc.price = req.body.price;
        doc.currency = req.body.currency;
        doc.payee = req.body.payee;

        if(req.body.description) doc.description = validator.escape(req.body.description);

        if(req.files && req.files.images) {
            for(let i = 0; i < req.files.images.length; i++) {
                const file = req.files.images[i];
                const result = await uploadToCloudinary(file.path, { folder: `gadget-catalog/${req.params.id}` });

                doc.files.push({ ...result });

                fs.unlink(file.path);
            }
        }

        await doc.save();
        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function deleteItem(req, res, next) {
    try {
        const doc = await Item.findOneAndRemove({ _id: req.params.id, createdBy: req.user._id });

        if(!doc) return res.sendStatus(404);

        const public_ids = [];

        doc.files.forEach(function(file) {
            public_ids.push(file.public_id);
        });

        if(doc.invoice) {
            public_ids.push(doc.invoice.public_id);
        }

        if(!public_ids.length) return res.sendStatus(200);

        await deleteResourcesFromCloudinary(public_ids);
        await deleteFolderFromCloudinary(`gadget-catalog/${doc._id}`);
    } catch(err) {
        next(err);
    }
}

async function updateImage(req, res, next) {
    try {
        let doc = await Item.findOne({ _id: req.params.itemId, createdBy: req.user._id }, "files");

        if(!doc) return res.sendStatus(404);

        doc.files = doc.files.map(function(x) {
            x.active = false;
            return x;
        });

        await doc.save();

        doc = await Item.findOneAndUpdate({ _id: req.params.itemId, createdBy: req.user._id, "files._id": req.params.fileId }, {
            $set: { "files.$.active": true }
        }, { new: true });

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function deleteImage(req, res, next) {
    try {
        const doc = await Item.findOne({ _id: req.params.itemId, createdBy: req.user._id });

        if(!doc || !req.params.fileId) return res.sendStatus(404);

        const file = doc.files.id(req.params.fileId);

        await destroyFromCloudinary(file.public_id, { invalidate: true });

        doc.files.id(req.params.fileId).remove();
        await doc.save();

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function getItemCountByYearRange(req, res, next) {
    const startYear = req.query.startYear;
    const endYear = req.query.endYear;

    try {
        const docs = await Item.find({
            createdBy: req.user._id,
            purchaseDate: { $lte: new Date(endYear, 11, 31), $gte: new Date(startYear, 0, 1)}
        }, "purchaseDate");

        if(!docs) return res.sendStatus(203);

        let data = {};

        docs.forEach(function(doc) {
            data[doc.purchaseDate.getFullYear()] = data[doc.purchaseDate.getFullYear()] !== undefined ? ++data[doc.purchaseDate.getFullYear()] : 1;
        });

        res.json(data);
    } catch(err) {
        next(err);
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
