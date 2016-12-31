let gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    plugins = require('gulp-load-plugins')({ lazy: true }),
    assets = require(path.join(process.cwd(), 'server/config/assets'));

gulp.task('nodemon', () => {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        verbose: true,
        watch: _.union(assets.server.views, assets.server.allJS)
    });
});
