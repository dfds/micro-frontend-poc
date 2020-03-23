var webpack = require("webpack");
var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const frontend = (env, argv) => {
    return {
        entry: {
            application: ["./src/Application.ts"],
        },
        output: {
            filename: "[name]." + argv.mode + ".js",
            path: __dirname + "/dist",
            libraryTarget: "umd",
            library: ["DFDS", "DEVEX", "Blasterv2", "[name]"]
        },

        devServer: {
            contentBase: [path.join(__dirname, 'view'), path.join(__dirname, 'dist')],
            compress: true,
            port: 9010,
            host: '0.0.0.0',
            disableHostCheck: true,
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
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name]." + argv.mode + ".css",
                chunkFilename: "[id].css"
            }),

        ]
    }
}

module.exports = [frontend];
