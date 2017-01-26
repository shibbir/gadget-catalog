let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ItemSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    purchaseDate: {
        type: Date
    },
    price: Number,
    file: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', ItemSchema);
