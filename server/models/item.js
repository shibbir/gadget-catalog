let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
    brandId: Schema.Types.ObjectId,
    purchaseDate: Date,
    price: Number,
    file: String,
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

module.exports = mongoose.model('Item', ItemSchema);
