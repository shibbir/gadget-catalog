const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config/config');
const FileSchema = require('./sub-documents/file');

let CategorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    file: FileSchema,
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

CategorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'categoryId'
});

CategorySchema.virtual('noImageUrl').get(function() {
    return config.noImageUrl;
});

module.exports = mongoose.model('Category', CategorySchema);
