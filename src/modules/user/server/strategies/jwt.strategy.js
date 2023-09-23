const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../user.model");

module.exports = function() {
    function cookieExtractor(req) {
        let token;
        if (req?.cookies) {
            token = req.cookies["access_token"];
        }
        return token;
    }

    passport.use(new JwtStrategy({
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: cookieExtractor
    }, async function(payload, done) {
        try {
            const user = await User.findById(payload.id);

            if(user) done(null, user);
            else done(null, false);
        } catch(err) {
            done(err, false);
        }
    }));
};
