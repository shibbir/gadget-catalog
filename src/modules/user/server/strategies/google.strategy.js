const passport = require("passport");
const User = require("../user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, function(accessToken, refreshToken, profile, done) {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        process.nextTick(async function() {
            try {
                const user = await User.findOne({ $or: [
                    { "google.id": id },
                    { "facebook.email": email },
                    { "local.email": email }
                ]});

                if(user) {
                    user.google = { id, email, accessToken, name: displayName };

                    await user.save();
                    done(null, user);
                } else {
                    let user = new User({
                        displayName: displayName,
                        google: {
                            id,
                            email,
                            accessToken,
                            name: displayName
                        }
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
