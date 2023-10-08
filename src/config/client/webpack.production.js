const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
    mode: "production",

    devtool: "source-map",

    output: {
        path: path.join(process.cwd(), "public/bundles"),
        filename: "[name].[contenthash].js"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        })
    ],

    optimization: {
        minimizer: [new TerserPlugin()]
    }
});
