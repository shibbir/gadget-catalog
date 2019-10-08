const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = require('../core/file.model');

let ItemSchema = Schema({
    name: {
        type: String,
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
    tags: Array,
    purchaseDate: Date,
    price: Number,
    files: [ FileSchema ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

ItemSchema.virtual('category', {
    justOne: true,
    ref: 'Category',
    foreignField: '_id',
    localField: 'categoryId'
});

ItemSchema.virtual('brand', {
    ref: 'Brand',
    justOne: true,
    foreignField: '_id',
    localField: 'brandId'
});

module.exports = mongoose.model('Item', ItemSchema);
