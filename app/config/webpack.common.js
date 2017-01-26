let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');

module.exports = {
    entry: {
        vendor: './app/vendor.js',
        app: './app/main.js'
    },

    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exlcude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether'
        })
    ]
};
