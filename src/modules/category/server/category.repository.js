const path = require("path");
const Category = require("./category.model");
const { ApolloError } = require("apollo-server-express");
const { cloudinary, uploadAsync, destroyAsync } = require(path.join(process.cwd(), "src/config/server/lib/cloudinary"));
const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getCategory(_id) {
    try {
        const doc = await Category.findOne({ _id }).exec();
        return doc;
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

async function getCategories(userId) {
    try {
        const docs = await Category.find({}, "name file").populate({
            path: "items",
            select: "_id",
            options: { lean: true },
            match: { createdBy: userId }
        }).sort("name").lean();

        docs.map(doc => {
            if(doc.file && doc.file.public_id) {
                doc.file.secure_url = cloudinary.v2.url(doc.file.public_id, {secure: true});
            }

            return doc;
        });

        return docs;
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

async function createCategory(body, userId) {
    const model = new Category({
        name: body.name,
        slug: convertToSlug(body.name),
        createdBy: userId
    });

    if(body.file) {
        try {
            const response = await uploadAsync(body.file, `gadget-catalog/${userId}/categories/`);
            model.file = {...response, active: true};
        } catch(err) {
            throw new ApolloError(err, 500);
        }
    }

    const doc = await model.save();
    return doc;
}

async function updateCategory(body, userId) {
    const doc = await Category.findOne({ _id: body._id }).exec();

    if(!doc) {
        throw new UserInputError("Category not found.", {
            invalidArgs: Object.keys(body)
        });
    }

    doc.name = body.name;
    doc.slug = convertToSlug(body.name);

    if(body.file) {
        try {
            const response = await uploadAsync(body.file, `gadget-catalog/${userId}/categories/`);
            if(doc.file && doc.file.public_id) await destroyAsync(doc.file.public_id);
            doc.file = {...response, active: true};
        } catch(err) {
            throw new ApolloError(err, 500);
        }
    }

    await doc.save();
    return doc;
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
