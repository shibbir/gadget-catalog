const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

const CategorySchema = Schema({
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
}, { toJSON: { virtuals: true } });

CategorySchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "categoryId"
});

CategorySchema.pre("save", function (next) {
    this.slug = convertToSlug(this.name);
    next();
});

module.exports = mongoose.model("Category", CategorySchema);
