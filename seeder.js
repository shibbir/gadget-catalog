const async = require("async");
const User = require("./modules/user/server/user.model");
const Brand = require("./modules/brand/server/brand.model");
const Category = require("./modules/category/server/category.model");

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

const userSeeder = function(callback) {
    const user = new User();

    user.role = "admin";
    user.displayName = "Administrator";
    user.local.name = "Administrator";
    user.local.email = "admin@example-domain.com";
    user.local.password = user.generateHash("temporary-password");

    user.save(function(err, doc) {
        if(err) return callback(err);
        callback(null, doc);
    });
};

const categorySeeder = function(user, callback) {
    const array = ["Category X", "Category Y"].sort();

    async.each(array, function(item, asyncCallback) {
        new Category({
            name: item,
            slug: convertToSlug(item),
            createdBy: user._id
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, user);
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
    async.waterfall([ userSeeder, categorySeeder, brandSeeder ], function(err) {
        if(err) console.error(err);
        else console.info("DB seed completed!");
        process.exit();
    });
});
