const request = require('supertest');
const passport = require('passport');
const app = require('../config/lib/express')();
const admin = require('./helpers/spec.helper').admin();

require('../config/lib/passport')(passport);
require('../routes/brand.routes')(app, passport);

describe('Brand Routes', function() {
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
});
