const passport = require("passport");
const User = require("../user.model");
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function() {
    passport.use(new FacebookStrategy({
        graphAPIVersion: "v4.0",
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"]
    }, function(accessToken, refreshToken, profile, done) {
        const { id, name, email } = profile._json;

        process.nextTick(async function() {
            try {
                const user = await User.findOne({ $or: [
                    { "facebook.id" : id },
                    { "google.email": email },
                    { "local.email": email }
                ]});

                if(user) {
                    user.facebook = { id, name, email, accessToken};

                    await user.save();
                    done(null, user);
                } else {
                    let user = new User({
                        displayName: name,
                        facebook: { id, name, email, accessToken }
                    });

                    user = await user.save();
                    done(null, user);
                }
            } catch(err) {
                done(err);
            }
        });
    }));
};
