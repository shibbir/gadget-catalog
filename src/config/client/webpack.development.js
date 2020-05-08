const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = webpackMerge(commonConfig, {
    mode: "development",

    output: {
        path: path.join(process.cwd(), "public/bundles"),
        filename: "[name].js"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
});
