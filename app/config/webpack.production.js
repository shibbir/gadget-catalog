const helpers = require("./helpers");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
    mode: "production",

    output: {
        path: helpers.root("public/bundles"),
        filename: "[name].[contenthash].js"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),

        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ["default", { discardComments: { removeAll: true } }]
            }
        }),
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
});
