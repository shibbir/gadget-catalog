const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const plugins = require('gulp-load-plugins')({ lazy: true });
const runSequence = require('run-sequence');
const defaultAssets = require(path.join(process.cwd(), 'server/config/assets/default'));
const testAssets = require(path.join(process.cwd(), 'server/config/assets/test'));

gulp.task('env:production', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('env:development', function() {
    process.env.NODE_ENV = 'development';
});

gulp.task('env:test', function() {
    process.env.NODE_ENV = 'test';
});

gulp.task('serve:production', ['env:production'], plugins.shell.task('node server.js'));

gulp.task('nodemon:watch', function() {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        verbose: true,
        watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS)
    });
});

gulp.task('run-all:watch', plugins.shell.task('npm run run-all:watch'));

gulp.task('test', ['env:test'], function(done) {
    let specReporter = require('jasmine-spec-reporter').SpecReporter;

    gulp.src(testAssets.tests.server).pipe(plugins.jasmine({
        config: require('./jasmine.json'),
        reporter: new specReporter()
    }));
});

gulp.task('test:coverage', ['env:test'], plugins.shell.task('npm run istanbul'));

gulp.task('production', function(done) {
    runSequence('env:production', 'run-all:watch', done);
});

gulp.task('default', function(done) {
    runSequence('env:development', 'run-all:watch', done);
});
