const faker = require('faker');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const Category = require('../models/category.model');
const Item = require('../models/item.model');
const helper = require('./helpers/spec.helper');
const admin = helper.admin();

require('../config/lib/passport')(passport);
require('../routes/category.routes')(app, passport);

describe('Category Routes', function() {
    let category = {};

    beforeAll(function(done) {
        new Category({
            name: faker.commerce.productName(),
            slug: helper.convertToSlug(faker.commerce.productName()),
            createdBy: admin._id
        }).save(function(err, doc) {
            category = doc;
            done();
        });
    });

    it('Should get all categories', function(done) {
        request(app)
            .get('/api/categories')
            .set('Authorization', `Bearer ${admin.jwtToken}`)
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
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should get a single category', function(done) {
        request(app)
            .get(`/api/categories/${category._id}`)
            .set('Authorization', `Bearer ${admin.jwtToken}`)
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
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
