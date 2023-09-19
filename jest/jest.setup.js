const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const User = require(path.join(process.cwd(), "src/modules/user/server/user.model"));

process.env.NODE_ENV = "test";
process.env.TOKEN_SECRET = "6368451b-50bc9a455e62";
process.env.REFRESH_SECRET = "6368451b-50bc9a455e62";
process.env.GOOGLE_CLIENT_ID = "xxx";
process.env.GOOGLE_CLIENT_SECRET = "xxx";
process.env.FACEBOOK_CLIENT_ID = "xxx";
process.env.FACEBOOK_CLIENT_SECRET = "xxx";
process.env.SMTP_HOST = "smtp.ethereal.email";
process.env.MAILER_ADDRESS = "hilario.white@ethereal.email";
process.env.MAILER_PASSWORD = "jcWZSJxDsu7gN3NnKG";
process.env.RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
process.env.RECAPTCHA_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
process.env.MONGODB_TEST_BASE_URL = process.env.MONGODB_TEST_BASE_URL || "mongodb://127.0.0.1";
process.env.MONGODB_URI = `${process.env.MONGODB_TEST_BASE_URL}/gadget-catalog-test`;

module.exports = async () => {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URI);

    await User.create({
        _id: "58e8d591a643633a109f29bc",
        displayName: faker.person.fullName(),
        role: "admin",
        local: {
            name: faker.person.fullName(),
            email: "admin@gadgetcatalog.com",
            password: bcrypt.hashSync("P@ssw0rd", 8),
            refresh_token: jwt.sign({
                id: "58e8d591a643633a109f29bc"
            }, process.env.REFRESH_SECRET, { expiresIn: "1d", issuer: "58e8d591a643633a109f29bc" })
        }
    });

    mongoose.connection.close();
};
