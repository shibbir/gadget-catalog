let jwt = require('jsonwebtoken');
let User = require('../models/user');
let config = require('../config/config');

let tokenResponse = function(user, provider) {
    let data = {
        _id: user._id,
        name: user.displayName,
        email: user[provider].email
    };

    let token = jwt.sign(data, config.tokenSecret, { expiresIn: '2d', issuer: user._id.toString() });

    return {
        token,
        data
    };
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
};
