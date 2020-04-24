const User = require("../../../../modules/user/server/user.model");
const JwtStrategy = require("passport-jwt").Strategy;

module.exports = function(passport) {
    function cookieExtractor(req) {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies["access_token"];
        }
        return token;
    }

    passport.use(new JwtStrategy({
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: cookieExtractor
    }, function(payload, done) {
        User.findById(payload._id, function(err, user) {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, user);
            }

            return done(null, false);
        });
    }));
};
