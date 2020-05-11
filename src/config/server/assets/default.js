module.exports = {
    client: {
        css: "public/bundles/app.css",
        js: "public/bundles/app.js"
    },
    server: {
        routes: ["src/modules/!(core)/server/**/*.routes.js", "src/modules/core/server/**/*.routes.js"],
        strategies: ["src/modules/**/*.strategy.js"]
    }
};
