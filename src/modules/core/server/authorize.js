const passport = require("passport");

module.exports = function(roles) {
    return function(req, res, next) {
        passport.authenticate("jwt", {session: false}, function(err, user) {
            if(err) res.status(403).send("Access Forbidden");
            else if(!user) res.status(401).send("Unauthorized Access");
            else {
                req.user = user;
                if(!roles || roles.length === 0) next();
                else if(roles.includes(user.role)) next();
                else res.status(403).send("Access Forbidden");
            }
        })(req, res, next);
    }
};
