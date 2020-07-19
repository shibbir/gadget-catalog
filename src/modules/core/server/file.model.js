const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = Schema({
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
    secure_url: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = FileSchema;
