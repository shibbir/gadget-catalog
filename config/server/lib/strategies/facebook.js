const User = require("../../../../modules/user/server/user.model");
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
        graphAPIVersion: "v4.0",
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/oauth/facebook/callback",
        profileFields: ["id", "displayName", "email"]
    }, function(accessToken, refreshToken, profile, done) {
        const { id, name, email } = profile._json;

        process.nextTick(function() {
            User.findOne({ $or: [
                { "facebook.id" : id },
                { "google.email": email },
                { "local.email": email }
            ]}, function(err, user) {
                if(err) return done(err);

                if(user) {
                    user.facebook = { id, name, email, accessToken};

                    user.save(function(err) {
                        if(err) return done(err);
                        done(null, user);
                    });
                } else {
                    const newUser = new User({
                        displayName: name,
                        facebook: { id, name, email, accessToken }
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
