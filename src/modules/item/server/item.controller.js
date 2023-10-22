const path = require("path");
const fs = require("fs/promises");
const mongoose = require("mongoose");
const validator = require("validator");
const { format, parseISO } = require("date-fns");

const Item = require("./item.model");
const { upload, destroy, deleteResources, deleteFolder } = require(path.join(process.cwd(), "src/config/server/lib/cloudinary"));

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
        const count = await Item.where(query).setOptions({ sanitizeFilter: true }).countDocuments();
        const docs = await Item.find(query).setOptions({ sanitizeFilter: true }).sort({ purchaseDate: "descending" }).skip(skip).limit(limit);

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
            description: req.body.description ? validator.escape(req.body.description) : null,
            createdBy: req.user._id
        });

        for(let i = 0; i < req.files?.images?.length; i++) {
            const file = req.files.images[i];
            const fileId = new mongoose.Types.ObjectId;
            const result = await upload(file.path, { public_id: fileId, folder: `gadget-catalog/${_id}` });

            item.assets.push({ _id: fileId, ...result, active: i ? false : true });

            await fs.unlink(file.path);
        }

        for(let i = 0; i < req.files?.invoice?.length; i++) {
            const file = req.files.invoice[i];
            const fileId = new mongoose.Types.ObjectId;
            const result = await upload(file.path, { public_id: fileId, folder: `gadget-catalog/${_id}` });

            item.invoice = { _id: fileId, ...result };

            await fs.unlink(file.path);
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
        doc.description = req.body.description ? validator.escape(req.body.description) : null;

        for(let i = 0; i < req.files?.images?.length; i++) {
            const file = req.files.images[i];
            const fileId = new mongoose.Types.ObjectId;
            const result = await upload(file.path, { public_id: fileId, folder: `gadget-catalog/${req.params.id}` });

            doc.assets.push({ _id: fileId, ...result });

            await fs.unlink(file.path);
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

        doc.assets.forEach(function(asset) {
            public_ids.push(asset.public_id);
        });

        if(doc.invoice) {
            public_ids.push(doc.invoice.public_id);
        }

        if(!public_ids.length) return res.sendStatus(200);

        await deleteResources(public_ids);
        await deleteFolder(`gadget-catalog/${doc._id}`);

        res.sendStatus(200);
    } catch(err) {
        next(err);
    }
}

async function updateImage(req, res, next) {
    try {
        let doc = await Item.findOne({ _id: req.params.itemId, createdBy: req.user._id }, "assets");

        if(!doc) return res.sendStatus(404);

        doc.assets = doc.assets.map(function(x) {
            x.active = false;
            return x;
        });

        await doc.save();

        doc = await Item.findOneAndUpdate({ _id: req.params.itemId, createdBy: req.user._id, "assets._id": req.params.assetId }, {
            $set: { "assets.$.active": true }
        }, { new: true });

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function deleteImage(req, res, next) {
    try {
        const doc = await Item.findOne({ _id: req.params.itemId, createdBy: req.user._id });

        if(!doc || !req.params.assetId) return res.sendStatus(404);

        const asset = doc.assets.id(req.params.assetId);

        await destroy(asset.public_id, { invalidate: true });

        doc.assets.id(req.params.assetId).deleteOne();
        await doc.save();

        res.json(doc);
    } catch(err) {
        next(err);
    }
}

async function getItemCountByYearRange(req, res, next) {
    const startYear = req.query.start_year;
    const endYear = req.query.end_year;

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
