const repository = require("./brand.repository");

const typeDef = `
    type Brand {
        _id: ID
        name: String
        slug: String
        date: String
        createdBy: String
    }

    input BrandInput {
        _id: ID
        name: String!
    }

    type Query {
        brand(_id: ID!): Brand,
        brands: [Brand]
    }

    type Mutation {
        createBrand(brand: BrandInput): Brand,
        updateBrand(brand: BrandInput): Brand
    }
`;

const resolvers = {
    Query: {
        brand: (parent, args, context) => repository.getBrand(args._id, context.req.user._id),
        brands: (parent, args, context) => repository.getBrands(context.req.user._id)
    },
    Mutation: {
        createBrand: (_, args, context) => repository.createBrand(args.brand, context.req.user._id),
        updateBrand: (_, args, context) => repository.updateBrand(args.brand, context.req.user._id)
    }
};

exports.typeDef = typeDef;
exports.resolvers = resolvers;
