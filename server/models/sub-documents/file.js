let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let config = require('../../config/config');

let FileSchema = Schema({
    public_id: {
        type: String,
        required: true
    },
    resource_type: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    }
}, { toJSON: { virtuals: true } });

FileSchema.virtual('url').get(function () {
    return `https://res.cloudinary.com/${config.cloudinary.cloud_name}/${this.resource_type}/${this.type}/${this.public_id}.${this.format}`;
});

module.exports = FileSchema;
