const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const async = require('async');
const User = require('../user/user.model');
const Category = require('../category/category.model');
const Brand = require('../brand/brand.model');
const Item = require('../item/item.model');

process.env.TOKEN_SECRET = '6368451b-50bc9a455e62';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gadget-catalog-test';
process.env.GOOGLE_CLIENT_ID = 'xxx';
process.env.GOOGLE_CLIENT_SECRET = 'xxx';
process.env.FACEBOOK_CLIENT_ID = 'xxx';
process.env.FACEBOOK_CLIENT_SECRET = 'xxx';

beforeAll(function(done) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    });

    let user = new User();

    user._id = '58e8d591a643633a109f29bc';
    user.displayName = 'User';
    user.local.name = 'User';
    user.local.email = 'user@test.com';
    user.local.password = user.generateHash('xxx-xxx-xxx');

    user.save(function() {
        done();
    });
});

afterAll(function(done) {
    async.parallel([
        function(callback) {
            User.deleteMany({}, () => callback());
        },
        function(callback) {
            Category.deleteMany({}, () => callback());
        },
        function(callback) {
            Brand.deleteMany({}, () => callback());
        },
        function(callback) {
            Item.deleteMany({}, () => callback());
        }
    ], function() {
        mongoose.connection.close();
        done();
    });
});

module.exports = {
    user: function() {
        let data = {
            _id: '58e8d591a643633a109f29bc',
            name: 'User',
            email: 'user@test.com'
        };

        data.accessToken = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d', issuer: data._id });
        data.password = 'xxx-xxx-xxx';

        return data;
    },
    convertToSlug: string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
};
