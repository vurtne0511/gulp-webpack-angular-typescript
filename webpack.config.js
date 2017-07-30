// webpack 模块
var webpack = require('webpack');

// bower webpack 插件
var BowerResolvePlugin = require("bower-resolve-webpack-plugin");

// path 模块
var path = require('path');

// webpack 配置参数
module.exports = {
    // watch: true,
    devtool: "source-map",
    node: {
        fs: "empty"
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        plugins: [new BowerResolvePlugin()],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['bower_components', 'src', 'node_modules'],
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style', 'css'] },
            { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=image/svg+xml&name=/[name].[ext]'] },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/font-woff&name=/[name].[ext]'] },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/font-woff2&name=/[name].[ext]'] },
            { test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/octet-stream&name=/[name].[ext]'] },
            { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/vnd.ms-fontobject&name=/[name].[ext]'] },
            { test: /\.(svg|png|jpg|jpeg|gif)$/, use: ['file?name=[name].[ext]?[hash]&outputPath=assets/images/&limit=10000'] },
            { test: /\.ts$/, use: ['ts'] }
        ]
    },
    // plugins: [
    //     new webpack.ProvidePlugin({})
    // ],
    entry: {
        index: './src/main.ts',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist/')
    }
};