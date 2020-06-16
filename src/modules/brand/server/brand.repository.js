const Brand = require("./brand.model");
const User = require("../../user/server/user.model");
const { ApolloError, UserInputError } = require("apollo-server-express");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

async function getBrand(_id, userId) {
    try {
        const doc = await Brand.findOne({ _id, createdBy: userId }).exec();
        return doc;
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

async function getBrands(userId) {
    try {
        const admin = await User.findOne({role: "admin"});

        const docs = await Brand.find({ $or: [
            { createdBy: userId },
            { createdBy: admin._id }
        ]}).sort("name").exec();

        return docs;
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

async function createBrand(body, userId) {
    try {
        const model = new Brand({
            name: body.name,
            slug: convertToSlug(body.name),
            createdBy: userId
        });

        return await model.save();
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

async function updateBrand(body, userId) {
    try {
        const doc = await Brand.findOne({ _id: body._id, createdBy: userId }).exec();

        if(!doc) {
            throw new UserInputError("Brand not found.", {
                invalidArgs: Object.keys(body)
            });
        }

        doc.name = body.name;
        doc.slug = convertToSlug(body.name);

        return await doc.save();
    } catch(err) {
        throw new ApolloError(err.stack, 500);
    }
}

exports.getBrand = getBrand;
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
