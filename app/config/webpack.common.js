const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: './app/main.js'
    },

    resolve: {
        modules: [path.join(process.cwd(), 'app'), 'node_modules'],
        extensions: ['.js', '.css'],
        symlinks: false
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
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
        new CleanWebpackPlugin('public/bundles', {
            root: process.cwd(),
            verbose: true,
            watch: true
        })
    ]
};
