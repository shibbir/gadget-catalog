let User = require('../../models/user');
let jwt = require('jsonwebtoken');
let config = require('../config');
let LocalStrategy = require('passport-local').Strategy;
let BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /**
     =========================================================================
     ============================== HTTP BEARER ==============================
     =========================================================================
     */
    passport.use('http-bearer', new BearerStrategy(function(token, done) {
        jwt.verify(token, config.tokenSecret, function(err, decoded) {
            if (err || decodedToken.exp <= Date.now()) {
                return done(null, false);
            }

            User.findOne({ _id: decodedToken.iss }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, { scope: 'read' });
            });
        });
    }));

    /**
     =========================================================================
     ============================= LOCAL SIGNUP ==============================
     =========================================================================
     */

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        email = email.toLowerCase();

        process.nextTick(function() {
            User.findOne({ $or: [
                { 'local.email': email }
            ]}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, { message: 'This email address is already registered.' });
                }

                if (!req.body.name) {
                    return done(null, false, { message: 'The name field is required.' });
                }

                let newUser = new User();

                newUser.displayName = req.body.name;
                newUser.local.name = req.body.name;
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err) {
                        return done(err);
                    }
                    done(null, newUser);
                });
            });
        });
    }));
};
