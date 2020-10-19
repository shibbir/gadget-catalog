const path = require("path");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require(path.join(process.cwd(), "src/modules/user/server/user.model"));

function generateAccessToken(doc) {
    return jwt.sign({
        id: doc._id,
    }, process.env.TOKEN_SECRET, {
        expiresIn: 1,
        issuer: doc._id.toString()
    });
}

function generateRefreshToken(doc) {
    return jwt.sign({
        id: doc._id,
    }, process.env.REFRESH_SECRET, {
        expiresIn: "1d",
        issuer: doc._id.toString()
    });
}

function allowRoles(roles) {
    return function (req, res, next) {
        if (req.user && req.user.role && !roles.includes(req.user.role)) {
            return res.status(403).send("Access Forbidden");
        }

        next();
    }
}

async function jwtAuthentication (req, res, next) {
    passport.authenticate("jwt", { session: false }, async function(err, user) {
        if (err) return next(err);

        if (!user) {
            try {
                const refresh_token = req.signedCookies["refresh_token"];

                if(!refresh_token) return res.status(401).send("Unauthorized").end();

                const payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
                const doc = await User.findById(payload.id);

                if(doc.local.refresh_token !== refresh_token) throw new Error();

                req.user = doc;
                res.cookie("access_token", generateAccessToken(doc), { httpOnly: true, sameSite: true, signed: true });
                return next();
            } catch(e) {
                res.clearCookie("access_token");
                res.clearCookie("refresh_token");
                return res.status(401).send("Unauthorized").end();
            }
        }

        req.user = user;
        next();
    })(req, res, next);
}

exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.allowRoles = allowRoles;
exports.jwtAuthentication = jwtAuthentication;
