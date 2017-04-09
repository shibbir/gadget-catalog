const _ = require('lodash');
const path = require('path');
const glob = require('glob');

let getGlobbedPaths = function (globPatterns, excludes) {
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

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
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

let initClientFiles = (config, assets) => {
    config.files = {
        client: {},
        server: {}
    };

    config.files.client.js = getGlobbedPaths(assets.client.js, ['public/']);
    config.files.client.css = getGlobbedPaths(assets.client.css, ['public/']);

    config.files.server.models = getGlobbedPaths(assets.server.models);
};

let initGlobalConfig = () => {
    let defaultAssets = require(path.join(process.cwd(), 'server/config/assets/default'));
    let environmentAssets = require(path.join(process.cwd(), 'server/config/assets/', process.env.NODE_ENV)) || {};
    let assets = _.merge(defaultAssets, environmentAssets);

    let defaultConfig = require('./env/default');
    let environmentConfig = require(path.join(process.cwd(), 'server/config/env/', process.env.NODE_ENV)) || {};
    let config = _.merge(defaultConfig, environmentConfig);

    initClientFiles(config, assets);

    return config;
};

module.exports = initGlobalConfig();
