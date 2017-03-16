const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const path = require('path');

module.exports = {
    entry: {
        vendor: './app/vendor.js',
        app: './app/main.js'
    },

    resolve: {
        extensions: ['.js'],
        modules: [ path.resolve(__dirname, 'app'), 'node_modules' ]
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        compact: false,
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: ['react-html-attrs', 'transform-class-properties']
                    }
                }],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
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
            'window.jQuery': 'jquery'
        })
    ]
};
