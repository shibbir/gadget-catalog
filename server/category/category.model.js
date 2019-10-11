const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FileSchema = require("../core/file.model");

let CategorySchema = Schema({
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
    file: FileSchema,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

CategorySchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "categoryId"
});

module.exports = mongoose.model("Category", CategorySchema);
