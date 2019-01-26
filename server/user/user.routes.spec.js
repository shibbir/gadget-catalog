const faker = require('faker');
const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const specHelper = require('../config/spec.helper');

require('../config/lib/passport')(passport);
require('./user.routes')(app, passport);

describe('User Routes', function() {
    const admin = specHelper.admin();

    it('Should create a local user', function(done) {
        request(app)
            .post('/api/register')
            .send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: 'xxx-xxx-xxx'
            })
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should login with valid credentials', function(done) {
        request(app)
            .post('/api/login')
            .send({
                email: admin.email,
                password: admin.password
            })
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });

    it('Should allow user to update the password', function(done) {
        request(app)
            .put('/api/profile/password')
            .set('Authorization', `Bearer ${admin.jwtToken}`)
            .send({
                currentPassword: admin.password,
                newPassword: 'xxx-xxx-xxx-xxx'
            })
            .expect(200)
            .end(function(err) {
                if(err) done.fail(err);
                done();
            });
    });
});
