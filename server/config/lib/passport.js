const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

                User.findOne({ role: 'admin' }, '_id', function(err, admin) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user, { scope: 'read', adminId: admin._id });
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
                { 'local.email': email },
                { 'facebook.email': email },
                { 'google.email': email }
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
        profileFields: ['id', 'displayName', 'email']
    }, function(token, refreshToken, profile, done) {
        const { id, displayName, emails } = profile;

        let email = emails ? emails[0].value : '';

        process.nextTick(function() {
            User.findOne({ $or: [
                { 'facebook.id' : id },
                { 'google.email': email },
                { 'local.email': email }
            ]}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    if (!user.facebook.id) {
                        user.facebook.id = id;
                        user.facebook.token = token;
                        user.facebook.name = displayName;

                        if(emails) {
                            user.facebook.email = emails[0].value;
                        }

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
                    let newUser = new User();

                    newUser.facebook.id = id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = displayName;
                    newUser.displayName = displayName;

                    if(emails) {
                        user.facebook.email = emails[0].value;
                    }

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

    /**
     =========================================================================
     ================================ GOOGLE =================================
     =========================================================================
     */

    passport.use(new GoogleStrategy({
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.oauth.google.callbackURL
    },
    function(token, refreshToken, profile, done) {
        const { id, displayName, emails } = profile;

        process.nextTick(function() {
            User.findOne({ $or: [
                { 'google.id': id },
                { 'facebook.email': emails[0].value },
                { 'local.email': emails[0].value }
            ]}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    if (!user.google.id) {
                        user.google.id = id;
                        user.google.token = token;
                        user.google.name = displayName;
                        user.google.email = emails[0].value;

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
                    let newUser = new User();

                    newUser.google.id = id;
                    newUser.google.token = token;
                    newUser.google.email = emails[0].value;
                    newUser.google.name = displayName;
                    newUser.displayName = displayName;

                    newUser.save(function(err) {
                        if (err) {
                            return done(err);
                        }
                        done(null, newUser);
                    });
                }
            });
        });
    }));
};
