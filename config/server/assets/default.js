module.exports = {
    client: {
        css: "public/bundles/app.css",
        js: "public/bundles/app.js"
    },
    server: {
        files: ["server.js", "server/**/*.js", "server/**/*.html"],
        routes: ["modules/!(core)/server/**/*.routes.js", "modules/core/server/**/*.routes.js"],
        strategies: ["modules/**/*.strategy.js"]
    }
};
