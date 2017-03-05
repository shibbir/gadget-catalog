const _ = require('lodash');
const async = require('async');
const Category = require('../models/category');
const Brand = require('../models/brand');

let categorySeeder = function(callback) {
    let array = ['Motherboard', 'Processor', 'Mobile', 'Miscellaneous', 'GPU'];

    async.each(array, function(item, asyncCallback) {
        new Category({
            name: item
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, "Category seeder completed!");
    });
};

let brandSeeder = function(callback) {
    let array = ['Apple', 'Asus', 'Dell', 'Intel', 'Nokia', 'Nvidia', 'Samsung', 'NVIDIA', 'Palit', 'SPARKLE', 'Cooler Master'];

    async.each(array, function(item, asyncCallback) {
        new Brand({
            name: item
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, "Brand seeder completed!");
    });
};

exports.run = function () {
    async.series([ categorySeeder, brandSeeder ], function(err, messages) {
        _.forEach(messages, function(message) {
            console.info(message);
        });
    });
};
