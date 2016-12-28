let debug = process.env.NODE_ENV !== 'production';
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: debug ? 'source-map' : null,

    entry: {
        vendor: './scripts/vendor.js',
        app: './scripts/app.js'
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
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },

    output: {
        path: './public/bundles',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether'
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, mangle: false, sourcemap: false })
    ]
};
