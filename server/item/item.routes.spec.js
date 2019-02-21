const faker = require('faker');
const async = require('async');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const Category = require('../category/category.model');
const Brand = require('../brand/brand.model');
const Item = require('./item.model');
const specHelper = require('../config/spec.helper');

require('../config/lib/passport')(passport);
require('./item.routes')(app, passport);

describe('Item Routes', function() {
    let category = {};
    let brand = {};
    let item = {};
    const user = specHelper.users.admin;

    beforeAll(function(done) {
        new Category({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        }).save(function(err, doc) {
            category = doc;
            done();
        });

        async.waterfall([
            function(callback) {
                new Category({
                    name: faker.commerce.productName(),
                    slug: specHelper.convertToSlug(faker.commerce.productName()),
                    createdBy: user._id
                }).save(function(err, doc) {
                    category = doc;
                    callback(null, category);
                });
            },
            function(category, callback) {
                new Brand({
                    name: faker.commerce.productName(),
                    slug: specHelper.convertToSlug(faker.commerce.productName()),
                    createdBy: user._id
                }).save(function(err, doc) {
                    brand = doc;
                    callback(null, category, brand);
                });
            },
            function(category, brand, callback) {
                new Item({
                    name: faker.commerce.productName(),
                    categoryId: category._id,
                    brandId: brand._id,
                    createdBy: user._id
                }).save(function(err, doc) {
                    item = doc;
                    callback();
                });
            }
        ],
        function() {
            done();
        });
    });

    it('Should get all items', function(done) {
        request(app)
            .get('/api/items')
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should create item', function(done) {
        request(app)
            .post('/api/items')
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id
            })
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should get a single item', function(done) {
        request(app)
            .get(`/api/items/${item._id}`)
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should update an item', function(done) {
        request(app)
            .put(`/api/items/${item._id}`)
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id
            })
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
