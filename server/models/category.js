let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
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

module.exports = mongoose.model('Category', CategorySchema);
