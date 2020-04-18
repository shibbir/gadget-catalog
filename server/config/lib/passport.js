module.exports = function(passport) {
    require("./strategies/jwt")(passport);
    require("./strategies/google")(passport);
    require("./strategies/facebook")(passport);
};
