module.exports = {
    client: {
        css: [
            'bundles/app.css'
        ],
        js: [
            'bundles/app.js'
        ]
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        models: 'server/models/**/*.js',
        allJS: ['server.js', 'server/config/**/*.js', 'server/**/*.js'],
        views: ['server/views/*.html']
    }
};
