const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    active: {
        type: Boolean,
        default: true
    }
}, { toJSON: { virtuals: true } });

FileSchema.virtual('url').get(function () {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${this.resource_type}/${this.type}/${this.public_id}.${this.format}`;
});

module.exports = FileSchema;
