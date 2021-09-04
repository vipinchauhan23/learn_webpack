const port = process.env.PORT || 8080;
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bandle.js', // create seperate module bundle with unique name for js 
        clean: true,
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        historyApiFallback: true,
        hot: true,
        // host: '0.0.0.0',
        inline: true,
        port: port,
        progress: true,
        disableHostCheck: true,
    }
})

