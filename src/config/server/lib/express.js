const config = require("../config");
const path = require("path");
const multer = require("multer");
const helmet = require("helmet");
const express = require("express");
const hbs = require("express-hbs");
const compression = require("compression");
const cookieParser = require("cookie-parser");

module.exports = function() {
    const app = express();

    app.locals.jsFiles = config.client.js;
    app.locals.cssFiles = config.client.css;

    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(process.cwd(), "public")));

    app.engine("html", hbs.express4({ extname: ".html" }));
    app.set("view engine", "html");
    app.set("views", path.join(process.cwd(), "src/modules/core/server"));

    app.use(multer({
        dest: "./public/uploads/",
        limits: {
            files: 3,
            fileSize: 1500000
        }
    }).array("files"));

    app.set("port", process.env.PORT);

    app.enable("trust proxy");

    config.server.routes.forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    config.server.strategies.forEach(function(strategy) {
        require(path.resolve(strategy))();
    });

    return app;
};
