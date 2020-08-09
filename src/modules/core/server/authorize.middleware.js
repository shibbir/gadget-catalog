const allowRoles = (roles) => {
    return function (req, res, next) {
        if (req.user && req.user.role && !roles.includes(req.user.role)) {
            return res.status(403).send("Access Forbidden");
        }

        next();
    }
};

module.exports = allowRoles;
