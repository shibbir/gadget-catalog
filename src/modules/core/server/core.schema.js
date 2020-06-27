const _ = require("lodash");
const brandSchema = require("../../brand/server/brand.schema");
const categorySchema = require("../../category/server/category.schema");

exports.typeDefs = [brandSchema.typeDefs, categorySchema.typeDefs];
exports.resolvers = _.merge(brandSchema.resolvers, categorySchema.resolvers);
