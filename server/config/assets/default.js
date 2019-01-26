module.exports = {
    client: {
        css: 'public/bundles/app.css',
        js: 'public/bundles/app.js'
    },
    server: {
        models: 'server/models/**/*.js',
        files: ['server.js', 'server/**/*.js', 'server/**/*.html'],
        specs: 'server/**/*[sS]pec.js'
    }
};
