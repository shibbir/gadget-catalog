const faker = require('faker');
const request = require('supertest');
const mongoose = require('mongoose');
const passport = require('passport');
const app = require('../config/lib/express')();
const helpers = require('./helpers');
const config = require('../config/env/test');

require('../config/lib/passport')(passport);
require('../routes/account.routes')(app, passport);

describe('Account routes', function() {
    let user = null;

    before(function(done) {
        mongoose.connect(config.db.uri);

        helpers.createLocalAccount(function(err, doc) {
            if (err) {
                throw err;
            }
            user = doc;
            done();
        });
    });

    after(function(done) {
        helpers.resetDB(function() {
            mongoose.connection.close();
            done();
        });
    });

    describe('POST /api/register', function() {
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

        it('Should return error if email address already exists', function(done) {
            request(app)
                .post('/api/register')
                .send({
                    name: faker.name.findName(),
                    email: user.email,
                    password: 'xxx-xxx-xxx'
                })
                .expect(400)
                .end(function(err, res) {
                    if(err) throw err;
                    done();
                });
        });
    });
});
