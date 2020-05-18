const _ = require("lodash");
const path = require("path");
const glob = require("glob");

const getGlobbedPaths = function (globPatterns, excludes) {
    const urlRegex = new RegExp("^(?:[a-z]+:)?\/\/", "i");

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (const item of excludes) {
                            file = file.replace(item, "");
                        }
                    } else {
                        file = file.replace(excludes, "");
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

function initGlobalConfig() {
    const defaultAssets = require(path.join(process.cwd(), "src/config/server/assets/default"));
    const environmentAssets = process.env.NODE_ENV === "production" ? require(path.join(process.cwd(), "src/config/server/assets/production")) : {};

    let assets = _.merge(defaultAssets, environmentAssets);

    let config = {
        client: {
            js: getGlobbedPaths(assets.client.js, ["public/"]),
            css: getGlobbedPaths(assets.client.css, ["public/"])
        },
        server: {
            routes: getGlobbedPaths(assets.server.routes),
            strategies: getGlobbedPaths(assets.server.strategies)
        }
    };

    return config;
}

module.exports = initGlobalConfig();
