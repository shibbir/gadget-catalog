let gulp = require('gulp');
let _ = require('lodash');
let path = require('path');
let plugins = require('gulp-load-plugins')({ lazy: true });
let assets = require(path.join(process.cwd(), 'server/config/assets'));

gulp.task('nodemon', () => {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        verbose: true,
        watch: _.union(assets.server.views, assets.server.allJS)
    });
});
