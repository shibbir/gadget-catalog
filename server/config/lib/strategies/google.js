const User = require('../../../user/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, function(token, refreshToken, profile, done) {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        process.nextTick(function() {
            User.findOne({ $or: [
                { 'google.id': id },
                { 'facebook.email': email },
                { 'local.email': email }
            ]}, function(err, user) {
                if(err) return done(err);

                if(user) {
                    if (!user.google) {
                        user.google = { id, name, email, token };

                        user.save(function(err) {
                            if(err) {
                                return done(err);
                            }
                            done(null, user);
                        });
                    } else {
                        done(null, user);
                    }
                } else {
                    let newUser = new User();

                    newUser.displayName = displayName;
                    newUser.google = { id, name, email, token };

                    newUser.save(function(err) {
                        if(err) return done(err);
                        done(null, newUser);
                    });
                }
            });
        });
    }));
};
