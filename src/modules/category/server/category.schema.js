const { gql } = require("apollo-server-express");
const repository = require("./category.repository");

const typeDefs = gql`
    type File {
        secure_url: String
    }

    type Item {
        _id: ID
        categoryId: String
    }

    type Category {
        _id: ID
        name: String
        slug: String
        date: String
        createdBy: String
        file: File
        items: [Item]
    }

    input CategoryInput {
        _id: ID
        name: String!
        file: Upload
    }

    extend type Query {
        category(_id: ID!): Category,
        categories: [Category]
    }

    extend type Mutation {
        createCategory(category: CategoryInput): Category,
        updateCategory(category: CategoryInput): Category
    }
`;

const resolvers = {
    Query: {
        category: (parent, args, context) => repository.getCategory(args._id, context.req.user._id),
        categories: (parent, args, context) => repository.getCategories(context.req.user._id)
    },
    Mutation: {
        createCategory: (_, args, context) => repository.createCategory(args.category, context.req.user._id),
        updateCategory: (_, args, context) => repository.updateCategory(args.category, context.req.user._id)
    }
};

module.exports = {
    typeDefs,
    resolvers
};
