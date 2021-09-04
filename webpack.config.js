const port = process.env.PORT || 8080;
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    // entry:{
    //     main:'src/index.js',
    //     vendor:'.src/vendor.js'
    // },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bandle.js', // create seperate module bundle with unique name for js 
        clean: true,
    },
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
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(), // minify css bundle
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
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
    devServer: {
        host: 'localhost',
        historyApiFallback: true,
        hot: true,
        // host: '0.0.0.0',
        inline: true,
        port: port,
        progress: true,
        disableHostCheck: true,
    }
}

