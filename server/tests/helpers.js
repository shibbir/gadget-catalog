const faker = require('faker');
const jwt = require('jsonwebtoken');
const async = require('async');
const User = require('../models/user.model');
const config = require('../config/env/test');

let tokenResponse = function(user, provider) {
    let data = {
        _id: user._id,
        name: user.displayName,
        email: user[provider].email
    };

    data.jwtToken = jwt.sign(data, config.tokenSecret, { expiresIn: '2d', issuer: user._id.toString() });

    return data;
};

exports.createLocalAccount = function(callback) {
    let user = new User();

    user.local.name = faker.name.findName();
    user.displayName = user.local.name;
    user.local.email = faker.internet.email().toLowerCase();
    user.local.password = user.generateHash('xxx-xxx-xxx');

    user.save(function(err, doc) {
        if(err) {
            return callback(err);
        }

        callback(null, tokenResponse(user, 'local'));
    });
};

exports.resetDB = function(callback) {
    async.parallel([
        function(asyncCallback) {
            User.remove({}, function() {
                asyncCallback();
            });
        }
    ],
    function() {
        callback();
    });
};
