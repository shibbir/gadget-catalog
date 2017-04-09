module.exports = {
    client: {
        css: [
            'public/bundles/app.css'
        ],
        js: [
            'public/bundles/app.js'
        ]
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        models: 'server/models/**/*.js',
        allJS: ['server.js', 'server/config/**/*.js', 'server/**/*.js'],
        views: ['server/views/*.html']
    }
};
