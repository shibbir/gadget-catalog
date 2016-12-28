'use strict';

module.exports = {
    client: {
        css: [
            'bundles/vendor.css',
            'bundles/app.css'
        ],
        js: [
            'bundles/vendor.js',
            'bundles/app.js'
        ]
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        models: 'server/models/**/*.js',
        allJS: ['server.js', 'config/**/*.js', 'app/**/*.js'],
        views: ['app/views/*.html']
    }
};
