const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackNotifierPlugin = require('webpack-notifier');

const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

const config = require('./config');

const server = config.server.localhost;

// path 模块
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    // devtool: 'source-map',
    watch: true,
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'SERVER': JSON.stringify(server.primary),
                'SERVER_ROOT': JSON.stringify(server.root)
            }
        }),
        new WebpackNotifierPlugin({
            title: config.name
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        // historyApiFallback: true,
        stats: 'minimal'
    }
});