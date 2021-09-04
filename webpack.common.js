const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    // entry:{
    //      index: './src/index.js',
    //      another: './src/another-module.js',
    // },
    // entry: {
    //     index: {
    //         import: './src/index.js',
    //         dependOn: 'shared', // dependOn option allows to share the modules between the chunks:
    //     },
    //     another: {
    //         import: './src/another-module.js',
    //         dependOn: 'shared',
    //     },
    //     shared: 'lodash',
    // },
    // output: {
    //     path: path.join(__dirname, '/dist'),
    //     filename: '[name].bundle.js',
    //     chunkFilename: '[name].bandle.[fullhash].js', // create seperate module bundle with unique name for js 
    //     clean: true,
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", // inject css -> dom
                    "css-loader", // css -> main js bundle
                    // "scss-loader", // convert scss -> css
                    'postcss-loader',
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: 'images'
                    }
                }
            }
        ]
    },
    optimization: {
        // runtimeChunk: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(), // minify css bundle
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Production',
            template: './public/index.html',
            minify: { // remove comments and whitspace
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),  // clean previous bundle
        new MiniCssExtractPlugin({ filename: "[name].[fullhash].css" }), // create seperate bundle for css
        new CopyPlugin({ // copy all data like images,font etc public to images
            patterns: [{ from: 'public', to: 'images' }
            ],
        }),
    ],
}

