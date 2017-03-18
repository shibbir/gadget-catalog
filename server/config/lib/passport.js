const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
        jwt.verify(token, config.tokenSecret, function(err, decodedToken) {
            if (err) {
                return done(null, false);
            }

            User.findOne({ _id: decodedToken.iss }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }

                User.findOne({ role: 'admin' }, '_id', function(err, adminId) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user, { scope: 'read', adminId });
                });
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

    /*
     =========================================================================
     =============================== FACEBOOK ================================
     =========================================================================
     */

    passport.use(new FacebookStrategy({
        clientID: config.oauth.facebook.clientID,
        clientSecret: config.oauth.facebook.clientSecret,
        callbackURL: config.oauth.facebook.callbackURL,
        profileFields: config.oauth.facebook.profileFields
    }, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ $or: [
                { 'facebook.id' : profile.id },
                { 'local.email': profile.emails[0].value }
            ]}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    if (!user.facebook.id) {
                        user.facebook.id = profile.id;
                        user.facebook.token = token;
                        user.facebook.name = profile.displayName;
                        user.facebook.email = profile.emails[0].value;

                        user.save(function(err) {
                            if (err) {
                                return done(err);
                            }
                            done(null, user);
                        });
                    } else {
                        done(null, user);
                    }
                } else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.displayName = profile.displayName;

                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        done(null, newUser);
                    });
                }
            });
        });
    }));
};
