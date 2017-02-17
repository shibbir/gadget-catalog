let _ = require('lodash');
let async = require('async');
let Category = require('../models/category');
let Brand = require('../models/brand');

let categorySeeder = function(callback) {
    let array = ['Motherboard', 'Processor', 'Mobile', 'Miscellaneous', 'GPU'];

    async.each(array, function(item, asyncCallback) {
        new Category({
            name: item
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, "Category seeder completed.");
    });
};

let brandSeeder = function(callback) {
    let array = ['Apple', 'Asus', 'Dell', 'Intel', 'Nokia', 'Nvidia', 'Samsung', 'NVIDIA'];

    async.each(array, function(item, asyncCallback) {
        new Brand({
            name: item
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, "Brand seeder completed.");
    });
};

exports.run = function () {
    async.series([ categorySeeder, brandSeeder ], function(err, messages) {
        _.forEach(messages, function(message) {
            console.info(message);
        });
    });
};
