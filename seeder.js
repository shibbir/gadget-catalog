const async = require("async");
const mongoose = require("./src/config/server/lib/mongoose");
const User = require("./src/modules/user/server/user.model");
const Brand = require("./src/modules/brand/server/brand.model");
const Category = require("./src/modules/category/server/category.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

const userSeeder = function(callback) {
    const user = new User();

    user.role = "admin";
    user.displayName = "Administrator";
    user.local.name = "Administrator";
    user.local.email = "admin@example-domain.com";
    user.local.password = user.generateHash("P@ssw0rd");

    user.save(function(err, doc) {
        if(err) return callback(err);
        callback(null, doc);
    });
};

const categorySeeder = function(callback) {
    const categories = [
        { name: "Category X", slug: convertToSlug("Category X") },
        { name: "Category Y", slug: convertToSlug("Category Y") }
    ].sort();

    async.each(categories, function(category, asyncCallback) {
        new Category(category).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null);
    });
};

const brandSeeder = function(user, callback) {
    const array = ["Brand X", "Brand Y"].sort();

    async.each(array, function(item, asyncCallback) {
        new Brand({
            name: item,
            slug: convertToSlug(item),
            createdBy: user._id
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback();
    });
};

require("dotenv").config();

mongoose.connect(function() {
    async.waterfall([ categorySeeder, userSeeder, brandSeeder ], function(err) {
        if(err) console.error(err);
        else console.info("DB seed completed!");
        process.exit();
    });
});
