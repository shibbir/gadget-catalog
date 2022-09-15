const mongoose = require("mongoose");

process.env.NODE_ENV = "test";
process.env.MONGODB_TEST_BASE_URL = process.env.MONGODB_TEST_BASE_URL || "mongodb://127.0.0.1";
process.env.MONGODB_URI = `${process.env.MONGODB_TEST_BASE_URL}/gadget-catalog-test`;

module.exports = async () => {
    mongoose.connect(process.env.MONGODB_URI);

    await mongoose.connection.dropDatabase();
    mongoose.connection.close();
};
