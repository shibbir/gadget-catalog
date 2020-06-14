const config = require("../config");
const path = require("path");
const multer = require("multer");
const express = require("express");
const hbs = require("express-hbs");
const jwt = require("jsonwebtoken");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const brandSchema = require("../../../modules/brand/server/brand.schema");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

module.exports = function() {
    const app = express();

    app.locals.jsFiles = config.client.js;
    app.locals.cssFiles = config.client.css;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(compression());
    app.use(cookieParser());

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

    const apolloServer = new ApolloServer({
        typeDefs: [brandSchema.typeDef],
        resolvers: [brandSchema.resolvers],
        context: ({ req }) => {
            if (req && req.cookies && req.cookies["access_token"]) {
                try {
                    const user = jwt.verify(req.cookies["access_token"], process.env.TOKEN_SECRET);
                    req.user = user;
                } catch(err) {
                    throw new AuthenticationError("You must be logged in!")
                }
            }
            return { req };
        }
    });

    apolloServer.applyMiddleware({ app });

    return app;
};
