const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    website: String,
    address: String,
    createdBy: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Vendor", VendorSchema);
