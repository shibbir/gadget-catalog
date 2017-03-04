const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const plugins = require('gulp-load-plugins')({ lazy: true });
const assets = require(path.join(process.cwd(), 'server/config/assets'));

gulp.task('nodemon', () => {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        verbose: true,
        watch: _.union(assets.server.views, assets.server.allJS)
    });
});
