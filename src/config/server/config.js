const _ = require("lodash");
const glob = require("glob");

const getGlobbedPaths = function (globPatterns, exclude) {
    const urlRegex = new RegExp("^(?:[a-z]+:)?\/\/", "i");

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, exclude));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);

            if (exclude) {
                files = files.map(function (file) {
                    file = file.replace(/\\/g, "/");
                    file = file.replace(exclude, "");
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

function initGlobalConfig() {
    const assets = {
        client: {
            css: [
                "public/bundles/vendors*.css",
                "public/bundles/app*.css"
            ],
            js: [
                "public/bundles/runtime*.js",
                "public/bundles/vendors*.js",
                "public/bundles/app*.js"
            ]
        },
        server: {
            routes: ["src/modules/!(core)/server/**/*.routes.js", "src/modules/core/server/**/*.routes.js"],
            strategies: ["src/modules/**/*.strategy.js"]
        }
    };

    const config = {
        client: {
            js: getGlobbedPaths(assets.client.js, "public/"),
            css: getGlobbedPaths(assets.client.css, "public/")
        },
        server: {
            routes: getGlobbedPaths(assets.server.routes),
            strategies: getGlobbedPaths(assets.server.strategies)
        }
    };

    return config;
}

module.exports = initGlobalConfig();
