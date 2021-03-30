const path = require("path");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require(path.join(process.cwd(), "src/modules/user/server/user.model"));

process.env.NODE_ENV = "test";
process.env.TOKEN_SECRET = "6368451b-50bc9a455e62";
process.env.REFRESH_SECRET = "6368451b-50bc9a455e62";
process.env.GOOGLE_CLIENT_ID = "xxx";
process.env.GOOGLE_CLIENT_SECRET = "xxx";
process.env.FACEBOOK_CLIENT_ID = "xxx";
process.env.FACEBOOK_CLIENT_SECRET = "xxx";
process.env.SMTP_HOST = "smtp.ethereal.email";
process.env.MAILER_ADDRESS = "clyde.miller@ethereal.email";
process.env.MAILER_PASSWORD = "db7CKmbGkRcaEJvd4s";
process.env.RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
process.env.RECAPTCHA_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
process.env.MONGODB_TEST_BASE_URL = process.env.MONGODB_TEST_BASE_URL || "mongodb://localhost";
process.env.MONGODB_URI = `${process.env.MONGODB_TEST_BASE_URL}/gadget-catalog-test`;

module.exports = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    await User.create({
        _id: "58e8d591a643633a109f29bc",
        displayName: faker.name.findName(),
        role: "admin",
        local: {
            name: faker.name.findName(),
            email: "admin@user.com",
            password: bcrypt.hashSync("P@ssword123", 8),
            refresh_token: jwt.sign({
                id: "58e8d591a643633a109f29bc"
            }, process.env.REFRESH_SECRET, { expiresIn: "1d", issuer: "58e8d591a643633a109f29bc" })
        }
    });

    mongoose.connection.close();
};
