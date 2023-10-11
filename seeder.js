const mongoose = require("mongoose");
const User = require("./src/modules/user/server/user.model");
const Brand = require("./src/modules/brand/server/brand.model");
const Category = require("./src/modules/category/server/category.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

(async function() {
    try {
        let user = new User({
            role: "admin",
            displayName: "John Doe",
            local: {
                name: "John Doe",
                email: "admin@example-domain.com"
            }
        });

        user.local.password = user.generateHash("P@ssw0rd");

        user = await user.save();

        await Category.insertMany([
            { name: "Category X", slug: convertToSlug("Category X") },
            { name: "Category Y", slug: convertToSlug("Category Y") }
        ]);

        await Brand.insertMany([
            { name: "Brand X", slug: convertToSlug("Brand X"), createdBy: user._id },
            { name: "Brand Y", slug: convertToSlug("Brand Y"), createdBy: user._id }
        ]);

        process.exit();
    } catch(err) {
        console.error(err);
    }
})();
