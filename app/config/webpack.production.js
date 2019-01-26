const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    output: {
        path: path.join(__dirname, 'public/bundles'),
        filename: '[name].[contenthash].js'
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            }
        })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
});
