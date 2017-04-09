const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('public/dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    plugins: [
        new ExtractTextPlugin('[name].[chunkhash].css'),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                if_return: true,
                join_vars: true
            },
            comments: false
        })
    ]
});
