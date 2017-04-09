module.exports = {
    client: {
        development: {
            css: [
                'bundles/app.css'
            ],
            js: [
                'bundles/app.js'
            ]
        },
        production: {
            css: [
                'public/dist/app*.css'
            ],
            js: [
                'public/dist/app*.js'
            ]
        }
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        models: 'server/models/**/*.js',
        allJS: ['server.js', 'server/config/**/*.js', 'server/**/*.js'],
        views: ['server/views/*.html']
    }
};
