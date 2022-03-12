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
        { name: "Desktop Cases", slug: convertToSlug("Cases") },
        { name: "Computer Accessories", slug: convertToSlug("Computer Accessories") },
        { name: "UPS Systems", slug: convertToSlug("UPS Systems") },
        { name: "Power Supplies", slug: convertToSlug("Power Supplies") },
        { name: "Optical Drives", slug: convertToSlug("Optical Drives") },

        { name: "CPU", slug: convertToSlug("CPU") },
        { name: "Motherboards", slug: convertToSlug("Motherboards") },
        { name: "Memory", slug: convertToSlug("Memory") },
        { name: "Monitors", slug: convertToSlug("Monitors") },
        { name: "Graphics Cards", slug: convertToSlug("Graphics Cards") },
        { name: "Sound Cards", slug: convertToSlug("Sound Cards") },

        { name: "Routers", slug: convertToSlug("Routers") },
        { name: "Gaming", slug: convertToSlug("Gaming") },

        { name: "Headphones", slug: convertToSlug("Headphones") },
        { name: "Keyboards", slug: convertToSlug("Keyboards") },
        { name: "Mice", slug: convertToSlug("Mice") },
        { name: "Microphones", slug: convertToSlug("Microphones") },
        { name: "Speakers", slug: convertToSlug("Speakers") },
        { name: "Webcams", slug: convertToSlug("Webcams") },
        { name: "Printers", slug: convertToSlug("Printers") },

        { name: "Mobile Phones", slug: convertToSlug("Mobile Phones") },
        { name: "Storage", slug: convertToSlug("Storage") },
        { name: "Wearables", slug: convertToSlug("Wearables") }
    ];

    async.each(categories, function(category, asyncCallback) {
        new Category(category).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null);
    });
};

const brandSeeder = function(user, callback) {
    const array = ["BrandX", "BrandY"].sort();

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
