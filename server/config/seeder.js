const async = require('async');
const Category = require('../models/category.model');
const Brand = require('../models/brand.model');
const User = require('../models/user.model');

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

const userSeeder = function(callback) {
    User.findOne({ role: 'admin' }, function(err, doc) {
        if(doc) {
            return callback(null, doc);
        }

        let user = new User();

        user.role = 'admin';
        user.displayName = 'Administrator';
        user.local.name = 'Administrator';
        user.local.email = 'admin@gadget-catalog.io';
        user.local.password = user.generateHash('password_that_will_change');

        user.save(function(err, doc) {
            if(err) {
                return callback(err);
            }
            callback(null, doc);
        });
    });
};

const categorySeeder = function(user, callback) {
    const array = [
        'Laptop', 'Motherboard', 'Processor', 'Mobile', 'Memory', 'Miscellaneous', 'Gaming consoles & peripherals',
        'Networking', 'PSU', 'GPU', 'Storage', 'Monitor', 'Chassis', 'Sound system', 'Computer Accessories'
    ].sort();

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
    const array = [
        'Acer', 'Apple', 'Asus', 'AMD', 'Cooler Master', 'Corsair', 'Dell', 'HP', 'Intel', 'Microsoft', 'MSI', 'Nokia',
        'Nvidia', 'Samsung', 'Sony', 'Thermaltake', 'HTC', 'Lenovo'
    ].sort();

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

exports.run = function () {
    async.waterfall([ userSeeder, categorySeeder, brandSeeder ], function(err) {
        if(err) {
            console.error(err);
        } else {
            console.info('DB seed completed!');
        }
    });
};
