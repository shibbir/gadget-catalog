const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
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
