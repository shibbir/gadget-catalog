const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = Schema({
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
    createdBy: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Brand", BrandSchema);
