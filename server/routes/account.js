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

    app.put('/api/profile/password', passport.authenticate('http-bearer', { session: false }), function(req, res) {
        User.findOne({ _id: req.user._id }, 'local', function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.currentPassword)) {
                return res.status(401).json({ type: 'error', message: 'Invalid credentials.' });
            }

            user.local.password = user.generateHash(req.body.newPassword);
            user.save();

            res.sendStatus(200);
        });
    });

    app.get('/api/oauth/profile', function(req, res) {
        const { provider, token } = req.query;
        const query = JSON.parse(`{"${provider}.token": "${token}"}`);

        User.findOne(query, 'facebook displayName', function(err, user) {
            if(err || !user) {
                return res.status(401).json({
                    type: 'ValidationError',
                    messages: ['Invalid access token or oauth provider.']
                });
            }
            res.json(tokenResponse(user, provider));
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest' }));

    app.get('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if(err || !user) {
                return res.redirect('http://localhost:4040/#/?provider=facebook&error=' + info.message);
            }

            res.redirect('http://localhost:4040/#/?provider=facebook&token=' + user.facebook.token);
        })(req, res, next);
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', function(req, res, next) {
        passport.authenticate('google', function(err, user, info) {
            if(err || !user) {
                return res.redirect('http://localhost:4040/#/?provider=google&error=' + info.message);
            }

            res.redirect('http://localhost:4040/#/?provider=google&token=' + user.google.token);
        })(req, res, next);
    });
};
