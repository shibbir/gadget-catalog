const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    devtool: "eval-source-map",

    entry: {
        app: "./src/modules/core/client/main.js"
    },

    resolve: {
        modules: [path.join(process.cwd(), "app"), "node_modules"],
        extensions: [".js", ".css"],
        symlinks: false
    },

    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),

        new webpack.DefinePlugin(envKeys)
    ],

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "url-loader"
            }
        ]
    }
};
