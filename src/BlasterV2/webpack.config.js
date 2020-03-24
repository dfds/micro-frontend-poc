var webpack = require("webpack");
var { resolve, join } = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const frontend = (env, argv) => {
    return {
        entry: {
            application: ["./src/Application.ts", "./view/ResizeSensor.js", "./view/ElementQueries.js"],
        },
        output: {
            filename: "[name].[contenthash]." + argv.mode + ".js",
            path: __dirname + "/dist",
            libraryTarget: "umd",
            library: ["DFDS", "DEVEX", "Blasterv2", "[name]"]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name]." + argv.mode + ".css",
                chunkFilename: "[name]." + argv.mode + ".css"
            }),
            new HtmlWebpackPlugin({ template: "view/index.html" }),
            new CleanWebpackPlugin({ verbose: true })
        ],

        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                        }
                    }
                }
        },
        devServer: {
            contentBase: [resolve(__dirname, 'view'), resolve(__dirname, 'dist')],
            compress: true,
            port: 9011,
            host: '0.0.0.0',
            disableHostCheck: true,
            proxy: {
                '/api/capsvc': {
                    target: '',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api/capsvc': ''
                    }
                }
            }
        },

        target: 'web',
        devtool: "source-map",

        resolve: {
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".scss"],
        },

        module: {
            rules: [
                { test: /\.tsx?$/, exclude: /node_modules/, use:[
                    //  {
                    //      loader: "babel-loader",
                    //      options: {
                    //          presets: ['@babel/preset-env',
                    //              {
                    //              }
                    //          ],
                    //          plugins: ['@babel/plugin-transform-classes', '@babel/plugin-proposal-class-properties', ["@babel/plugin-proposal-decorators", { "legacy": true }]],
                    //          sourceMaps: false
                    //      }
                    //  },    
                    {
                        loader: "ts-loader",
                        options: {
                        }
                    },                
                ] },

                // { test: /\.js?$/, exclude: /node_modules/, use:[
                //     {
                //         loader: "babel-loader",
                //         options: {
                //             presets: ['@babel/preset-env',
                //                 {

                //                 }
                //             ],
                //             plugins: ['@babel/plugin-transform-classes'],
                //             sourceMaps: false
                //         }
                //     }
                // ] },

                { test: /\.scss?$/, exclude: /node_modules/, use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ]},

                {
                    test: /\.(gif|svg|jpg|png|woff|woff2)$/,
                    loader: "file-loader",
                },
            ]
        }
    }
}

module.exports = [frontend];
