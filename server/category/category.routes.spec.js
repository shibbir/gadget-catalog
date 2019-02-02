const faker = require('faker');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const Category = require('./category.model');
const Item = require('../item/item.model');
const specHelper = require('../config/spec.helper');

require('../config/lib/passport')(passport);
require('./category.routes')(app, passport);

describe('Category Routes', function() {
    let category = {};
    const user = specHelper.user();

    beforeAll(function(done) {
        new Category({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        }).save(function(err, doc) {
            category = doc;
            done();
        });
    });

    it('Should get all categories', function(done) {
        request(app)
            .get('/api/categories')
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should create category', function(done) {
        request(app)
            .post('/api/categories')
            .send({
                name: faker.commerce.productName()
            })
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err, doc) {
                console.log(doc);
                if(err) done.fail(err);
                done();
            });
    });

    it('Should get a single category', function(done) {
        request(app)
            .get(`/api/categories/${category._id}`)
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should update category', function(done) {
        request(app)
            .put(`/api/categories/${category._id}`)
            .send({
                name: faker.commerce.productName()
            })
            .set('Cookie', [`access_token=${user.accessToken}`])
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
