const faker = require('faker');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const async = require('async');
const config = require('../../config/env/test');
const User = require('../../models/user.model');
const Category = require('../../models/category.model');
const Brand = require('../../models/brand.model');

exports.admin = function() {
    let data = {
        _id: '58e8d591a643633a109f29bc',
        name: 'Administrator',
        email: 'admin@test.com'
    };

    data.jwtToken = jwt.sign(data, config.tokenSecret, { expiresIn: '2d', issuer: data._id });
    data.password = 'xxx-xxx-xxx';

    return data;
};

beforeAll(function(done) {
    mongoose.connect(config.db.uri);

    let user = new User();

    user._id = '58e8d591a643633a109f29bc';
    user.role = 'admin';
    user.displayName = 'Administrator';
    user.local.name = 'Administrator';
    user.local.email = 'admin@test.com';
    user.local.password = user.generateHash('xxx-xxx-xxx');

    user.save(function() {
        done();
    });
});

afterAll(function(done) {
    async.parallel([
        function(callback) {
            User.remove({}, function() {
                callback();
            });
        },
        function(callback) {
            Category.remove({}, function() {
                callback();
            });
        },
        function(callback) {
            Brand.remove({}, function() {
                callback();
            });
        }
    ],
    function() {
        mongoose.connection.close();
        done();
    });
});
