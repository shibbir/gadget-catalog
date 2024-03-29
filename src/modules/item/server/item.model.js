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
    version: {
        type: String
    },
    format: {
        type: String,
        required: true
    },
    secure_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    active: {
        type: Boolean,
        default: false
    }
});

const ItemSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: String,
    categoryId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    brandId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    tags: Array,
    purchaseDate: Date,
    price: Number,
    currency: {
        type: String,
        required: true,
        enum: ["AUD", "BDT", "BGN", "CAD", "CNY", "EUR", "GBP", "INR", "JPY", "NZD", "RUB", "SGD", "USD"]
    },
    payee: {
        type: String,
        minlength: 2,
        maxlength: 30
    },
    assets: [FileSchema],
    invoice: FileSchema,
    createdBy: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

ItemSchema.virtual("category", {
    justOne: true,
    ref: "Category",
    foreignField: "_id",
    localField: "categoryId"
});

ItemSchema.virtual("brand", {
    ref: "Brand",
    justOne: true,
    foreignField: "_id",
    localField: "brandId"
});

module.exports = mongoose.model("Item", ItemSchema);
