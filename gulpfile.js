let gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    plugins = require('gulp-load-plugins')({ lazy: true }),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    assets = require(path.join(process.cwd(), 'config/assets'));

gulp.task('env:dev', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('env:prod', () => {
    process.env.NODE_ENV = 'production';
});

gulp.task('nodemon', () => {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        verbose: true,
        watch: _.union(assets.server.views, assets.server.allJS)
    });
});

gulp.task('webpack', done => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if(err) throw new plugins.util.PluginError('webpack', err);
        plugins.util.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task('serve', done => {
    runSequence('env:dev', 'webpack', 'nodemon', done);
});
