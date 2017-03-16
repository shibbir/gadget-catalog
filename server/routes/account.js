const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

let tokenResponse = function(user, provider) {
    let data = {
        _id: user._id,
        name: user.displayName,
        email: user[provider].email
    };

    data.jwtToken = jwt.sign(data, config.tokenSecret, { expiresIn: '2d', issuer: user._id.toString() });

    return data;
};

module.exports = function(app, passport) {
    app.post('/api/register', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if(err || !user) {
                return res.status(400).json({
                    type: 'ValidationError',
                    messages: [ info.message ]
                });
            }

            res.json(tokenResponse(user, 'local'));
        })(req, res, next);
    });

    app.post('/api/login', function(req, res) {
        User.findOne({ 'local.email': req.body.email }).exec(function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.password)) {
                return res.status(401).json({
                    type: 'ValidationError',
                    messages: [ 'Invalid credentials.' ]
                });
            }

            res.json(tokenResponse(user, 'local'));
        });
    });

    app.get('/api/profile', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        res.json(tokenResponse(req.user, 'local'));
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest' }));

    app.get('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if(err || !user) {
                return res.redirect('http://localhost:4040/#/provider=facebook&error=' + info.message);
            }

            res.redirect('http://localhost:4040/#/provider=facebook&token=' + user.facebook.token);
        })(req, res, next);
    });
};