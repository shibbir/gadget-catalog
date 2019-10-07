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

const admin = {
    _id: '58e8d591a643633a109f29bc',
    displayName: 'Admin User',
    role: 'admin',
    local: {
        name: 'admin',
        email: 'admin@user.com',
        password: new User().generateHash('xxx-xxx-xxx')
    },
    email: 'admin@user.com',
    password: 'xxx-xxx-xxx',
    accessToken: jwt.sign({
        _id: '58e8d591a643633a109f29bc',
        name: 'Admin User',
        email: 'admin@user.com'
    }, process.env.TOKEN_SECRET, { expiresIn: '1d', issuer: '58e8d591a643633a109f29bc' })
};

const basic = {
    _id: '58e8d591a643633a109f29bd',
    displayName: 'Basic User',
    role: 'basic',
    local: {
        name: 'basic',
        email: 'basic@user.com',
        password: new User().generateHash('xxx-xxx-xxx')
    },
    email: 'basic@user.com',
    password: 'xxx-xxx-xxx',
    accessToken: jwt.sign({
        _id: '58e8d591a643633a109f29bd',
        name: 'Basic User',
        email: 'basic@user.com'
    }, process.env.TOKEN_SECRET, { expiresIn: '1d', issuer: '58e8d591a643633a109f29bd' })
};

beforeAll(function(done) {
    mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    User.insertMany([admin, basic], function() {
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
    users: { admin, basic },
    convertToSlug: string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
};
