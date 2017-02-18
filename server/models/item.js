let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let config = require('../config/config');
let FileSchema = require('./sub-documents/file');

let ItemSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    purchaseDate: Date,
    price: Number,
    files: [ FileSchema ],
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

ItemSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id'
});

ItemSchema.virtual('brand', {
    ref: 'Brand',
    localField: 'brandId',
    foreignField: '_id'
});

ItemSchema.virtual('defaultImage').get(function () {
    return config.defaultImageUrl;
});

module.exports = mongoose.model('Item', ItemSchema);
