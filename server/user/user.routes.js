const jwt = require('jsonwebtoken');
const User = require('./user.model');

function generateAccessToken(user, provider) {
    return jwt.sign({
        _id: user._id,
        name: user.displayName,
        email: user[provider].email
    }, process.env.TOKEN_SECRET,{
        expiresIn: '1d',
        issuer: user._id.toString()
    });
};

module.exports = function(app, passport) {
    app.post('/api/register', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if(err || !user) {
                return res.status(400).json({ message: info.message });
            }

            res.cookie('access_token', generateAccessToken(user, 'local'), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json({
                name: user.displayName,
                isAdmin: user.role === 'admin'
            });
        })(req, res, next);
    });

    app.post('/api/login', function(req, res) {
        User.findOne({ 'local.email': req.body.email }).exec(function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.password)) {
                return res.sendStatus(401);
            }

            res.cookie('access_token', generateAccessToken(user, 'local'), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            });

            res.json({
                name: user.displayName,
                isAdmin: user.role === 'admin'
            });
        });
    });

    app.get('/api/logout', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.clearCookie('access_token').redirect("/");
    });

    app.get('/api/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.json({
            name: req.user.displayName,
            isAdmin: req.user.role === 'admin'
        });
    });

    app.put('/api/profile/password', passport.authenticate('jwt', { session: false }), function(req, res) {
        User.findOne({ _id: req.user._id }, 'local', function(err, user) {
            if(err) {
                return res.sendStatus(500);
            }

            if(!user || !user.validPassword(req.body.currentPassword)) {
                return res.sendStatus(401);
            }

            user.local.password = user.generateHash(req.body.newPassword);
            user.save();

            res.json();
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user) {
            if(err) {
                return res.redirect(`/#/?provider=facebook&error=${err.message}`);
            }

            res.cookie('access_token', generateAccessToken(user, 'facebook'), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/#/");
        })(req, res, next)
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', function(req, res, next) {
        passport.authenticate('google', function(err, user) {
            if(err) {
                return res.redirect(`/#/?provider=google&error=${err.message}`);
            }

            res.cookie('access_token', generateAccessToken(user, 'google'), {
                expires: new Date(Date.now() + 8.64e+7),
                httpOnly: true
            }).redirect("/#/");
        })(req, res, next);
    });
};
