const config = require("../config");
const path = require("path");
const csurf = require("csurf");
const helmet = require("helmet");
const express = require("express");
const hbs = require("express-hbs");
const compression = require("compression");
const cookieParser = require("cookie-parser");

module.exports = function() {
    const app = express();

    app.use(helmet({contentSecurityPolicy: false}));
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(csurf({ cookie: true }));
    app.use(express.static(path.join(process.cwd(), "public")));

    app.engine("html", hbs.express4({ extname: ".html" }));
    app.set("view engine", "html");
    app.set("views", path.join(process.cwd(), "src/modules/core/server"));

    app.set("port", process.env.PORT);

    app.enable("trust proxy");

    app.locals.jsFiles = config.client.js;
    app.locals.cssFiles = config.client.css;

    config.server.routes.forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    config.server.strategies.forEach(function(strategy) {
        require(path.resolve(strategy))();
    });

    return app;
};
