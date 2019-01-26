const faker = require('faker');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const Brand = require('./brand.model');
const specHelper = require('../config/spec.helper');

require('../config/lib/passport')(passport);
require('./brand.routes')(app, passport);

describe('Brand Routes', function() {
    let brand = {};
    const admin = specHelper.admin();

    beforeAll(function(done) {
        new Brand({
            name: faker.company.companyName(),
            slug: specHelper.convertToSlug(faker.company.companyName()),
            createdBy: admin._id
        }).save(function(err, doc) {
            brand = doc;
            done();
        });
    });

    it('Should get all brands', function(done) {
        request(app)
            .get('/api/brands')
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should create category', function(done) {
        request(app)
            .post('/api/brands')
            .send({
                name: faker.company.companyName()
            })
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should get a single brand', function(done) {
        request(app)
            .get(`/api/brands/${brand._id}`)
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
