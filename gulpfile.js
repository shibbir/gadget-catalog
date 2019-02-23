const path = require('path');
const { series, src, dest } = require('gulp');
const webpackStream = require('webpack-stream');
const plugins = require('gulp-load-plugins')({ lazy: true });
const assets = require(path.join(process.cwd(), 'server/config/assets/default'));

function development(done) {
    process.env.NODE_ENV = 'development';
    done();
}

function production(done) {
    process.env.NODE_ENV = 'production';
    done();
}

function webpack() {
    return src('app/main.js')
        .pipe(webpackStream(require('./webpack.config.js')))
        .pipe(dest('public/bundles'));
}

function server(done) {
    plugins.nodemon({
        script: 'server',
        nodeArgs: ['--inspect'],
        ext: 'js html',
        verbose: true,
        watch: assets.server.files,
        ignore: ['*.spec.js'],
        done
    });
}

function test() {
    process.env.NODE_ENV = 'test';
    let specReporter = require('jasmine-spec-reporter').SpecReporter;

    return src(assets.server.specs).pipe(plugins.jasmine({
        reporter: new specReporter()
    }));
}

exports.default = series(development, webpack, server);
exports.production = series(production, webpack, server);
exports.test = test;
