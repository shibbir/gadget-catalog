let _ = require('lodash');
let async = require('async');
let Category = require('../models/category');

let categorySeeder = function(callback) {
    let array = ['Motherboard', 'Processor', 'Mobile', 'Miscellaneous'];

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

exports.run = function () {
    async.series([ categorySeeder ], function(err, messages) {
        _.forEach(messages, function(message) {
            console.info(message);
        });
    });
};
