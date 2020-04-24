const path = require("path");
const config = require("./config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../modules/user/server/user.model");

process.env.NODE_ENV = "test";
process.env.TOKEN_SECRET = "6368451b-50bc9a455e62";
process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gadget-catalog-test";
process.env.GOOGLE_CLIENT_ID = "xxx";
process.env.GOOGLE_CLIENT_SECRET = "xxx";
process.env.FACEBOOK_CLIENT_ID = "xxx";
process.env.FACEBOOK_CLIENT_SECRET = "xxx";
process.env.SMTP_HOST = "smtp.ethereal.email";
process.env.MAILER_ADDRESS = "clyde.miller@ethereal.email";
process.env.MAILER_PASSWORD = "db7CKmbGkRcaEJvd4s";

config.server.strategies.forEach(function (strategy) {
    require(path.resolve(strategy))();
});

const admin = {
    _id: "58e8d591a643633a109f29bc",
    displayName: "Admin User",
    role: "admin",
    local: {
        name: "admin",
        email: "admin@user.com",
        password: new User().generateHash("xxx-xxx-xxx")
    },
    email: "admin@user.com",
    password: "xxx-xxx-xxx",
    accessToken: jwt.sign({
        _id: "58e8d591a643633a109f29bc",
        name: "Admin User",
        email: "admin@user.com"
    }, process.env.TOKEN_SECRET, { expiresIn: "1d", issuer: "58e8d591a643633a109f29bc" })
};

const basic = {
    _id: "58e8d591a643633a109f29bd",
    displayName: "Basic User",
    role: "basic",
    local: {
        name: "basic",
        email: "basic@user.com",
        password: new User().generateHash("xxx-xxx-xxx")
    },
    email: "basic@user.com",
    password: "xxx-xxx-xxx",
    accessToken: jwt.sign({
        _id: "58e8d591a643633a109f29bd",
        name: "Basic User",
        email: "basic@user.com"
    }, process.env.TOKEN_SECRET, { expiresIn: "1d", issuer: "58e8d591a643633a109f29bd" })
};

before(async function() {
    mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    await User.insertMany([admin, basic]);
});

after(async function() {
    await mongoose.connection.dropDatabase();
    mongoose.connection.close()
});

module.exports = {
    users: { admin, basic },
    convertToSlug: string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-")
};
