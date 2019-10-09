const User = require("../../../user/user.model");
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"]
    }, function(token, refreshToken, profile, done) {
        const { id, name, email } = profile._json;

        process.nextTick(function() {
            User.findOne({ $or: [
                { "facebook.id" : id },
                { "google.email": email },
                { "local.email": email }
            ]}, function(err, user) {
                if(err) return done(err);

                if(user) {
                    if (!user.facebook) {
                        user.facebook = { id, name, email, token};

                        user.save(function(err) {
                            if(err) return done(err);
                            done(null, user);
                        });
                    } else {
                        done(null, user);
                    }
                } else {
                    let newUser = new User({
                        displayName: name,
                        facebook: { id, name, email, token }
                    });

                    newUser.save(function(err) {
                        if(err) throw err;
                        done(null, newUser);
                    });
                }
            });
        });
    }));
};
