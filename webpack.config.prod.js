const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/*
const HtmlWebpackPlugin = require('html-webpack-plugin');
*/
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'Template - PROD',
    template: __dirname + '/client/index.html',
    filename: 'index.html',
    hash: true,
    inject: 'body'
});*/

module.exports = {
    context: __dirname + '/client',
    entry: __dirname + '/client/App.js',
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
            { test: /\.mp4$/, use: 'file-loader'},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize=true", "sass-loader"]
                })
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        /*htmlWebpackPlugin,*/
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('styles.css'),
        new CompressionWebpackPlugin({
            test: /\.(js|css)$/
        })
    ],
};
