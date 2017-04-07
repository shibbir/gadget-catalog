const faker = require('faker');
const request = require('supertest');
const mongoose = require('mongoose');
const passport = require('passport');
const app = require('../config/lib/express')();
const helpers = require('./helpers');
const config = require('../config/env/test');

require('../config/lib/passport')(passport);
require('../routes/account.routes')(app, passport);

describe('Account Routes', function() {
    let admin = {};

    before(function(done) {
        mongoose.connect(config.db.uri);

        helpers.createAccount('admin', function(err, doc) {
            if(err) {
                throw err;
            }
            admin = doc;
            done();
        });
    });

    after(function(done) {
        helpers.resetDB(function() {
            mongoose.connection.close();
            done();
        });
    });

    describe('User login & registration', function() {
        it('Should create a local account', function(done) {
            request(app)
                .post('/api/register')
                .send({
                    name: faker.name.findName(),
                    email: faker.internet.email(),
                    password: 'xxx-xxx-xxx'
                })
                .expect(200)
                .end(function(err) {
                    if(err) throw err;
                    done();
                });
        });

        it('Should login with valid credentials', function(done) {
            request(app)
                .post('/api/login')
                .send({
                    email: admin.email,
                    password: 'xxx-xxx-xxx'
                })
                .expect(200)
                .end(function(err, res) {
                    if(err) throw err;
                    done();
                });
        });
    });

    describe('User profile', function() {
        let user = {};

        before(function(done) {
            helpers.createAccount('basic', function(err, doc) {
                if(err) {
                    throw err;
                }
                user = doc;
                done();
            });
        });

        it('Should allow user to update the password', function(done) {
            request(app)
                .put('/api/profile/password')
                .set('Authorization', `Bearer ${user.jwtToken}`)
                .send({
                    currentPassword: 'xxx-xxx-xxx',
                    newPassword: 'xxx-xxx-xxx-xxx'
                })
                .expect(200)
                .end(function(err, res) {
                    if(err) throw err;
                    done();
                });
        });
    });
});
