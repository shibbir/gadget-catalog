const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BrandSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Brand', BrandSchema);
