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
});

module.exports = mongoose.model('Category', CategorySchema);
