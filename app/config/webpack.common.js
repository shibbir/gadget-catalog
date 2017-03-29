const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './app/main.js'
    },

    resolve: {
        modules: [ path.join(process.cwd(), 'app'), 'node_modules' ],
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        compact: false,
                        presets: ['react', ['es2015', { modules: false }]],
                        plugins: ['transform-object-rest-spread']
                    },
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
            name: ['app']
        }),

        new CleanWebpackPlugin(['bundles'], {
            root: path.resolve(__dirname, '../../public'),
            verbose: true,
            dry: false
        })
    ]
};
