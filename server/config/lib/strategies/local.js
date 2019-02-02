const User = require('../../../user/user.model');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, function(req, email, password, done) {
        email = email.toLowerCase();

        process.nextTick(function() {
            User.findOne({ $or: [
                { 'local.email': email },
                { 'facebook.email': email },
                { 'google.email': email }
            ]}, function(err, user) {
                if(err) return done(err);

                if(user) {
                    return done(null, false, { message: 'This email address is already registered.' });
                }

                if(!req.body.name) {
                    return done(null, false, { message: 'The name field is required.' });
                }

                let newUser = new User();

                newUser.displayName = req.body.name;
                newUser.local.name = req.body.name;
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if(err) return done(err);
                    done(null, newUser);
                });
            });
        });
    }));
};
