const faker = require('faker');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const admin = require('./helpers/spec.helper').admin();

require('../config/lib/passport')(passport);
require('../routes/category.routes')(app, passport);

describe('Category Routes', function() {
    it('Should create category', function(done) {
        request(app)
            .post('/api/categories')
            .send({
                name: faker.name.findName()
            })
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
