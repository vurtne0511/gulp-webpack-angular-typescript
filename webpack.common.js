// webpack 模块
const webpack = require('webpack');

// bower webpack 插件
const BowerResolvePlugin = require("bower-resolve-webpack-plugin");

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

// webpack 配置参数
module.exports = {
    // target: 'electron-renderer',
    node: {
        fs: "empty"
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        plugins: [new BowerResolvePlugin()],
        extensions: ['.ts', '.js', '.json'],
        modules: ['src/', 'node_modules'],
        alias: {
            'datepickerCore': 'bootstrap-datepicker',
            'datepicker': 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
            'daterangepicker': 'bootstrap-daterangepicker',

            'strings': 'app/constants/strings',

            'pnotify-style': 'pnotify/dist/pnotify.css',

            'notify': 'libs/notify',
            'clockpicker': 'clockpicker/dist/jquery-clockpicker.js',
            'chosen': 'chosen-js',

            'magnific-popup-style': 'magnific-popup/dist/magnific-popup.css'
        }
    },
    module: {
        rules: [

            { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=image/svg+xml&name=/[name].[ext]'] },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/font-woff&name=/[name].[ext]'] },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/font-woff2&name=/[name].[ext]'] },
            { test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/octet-stream&name=/[name].[ext]'] },
            { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url?limit=65000&mimetype=application/vnd.ms-fontobject&name=/[name].[ext]'] },
            { test: /\.(svg|png|jpg|jpeg|gif)$/, use: ['file?name=[name].[ext]?[hash]&outputPath=assets/images/&limit=10000'] },

            { test: /\.ts$/, exclude: /node_modules|bower_components/, use: ['ts'] },
            { test: /\.json$/, use: ['json'] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style', use: ['css'] }) },
            { test: /\.less$/, exclude: [/\.component\.less$/], use: ExtractTextPlugin.extract({ fallback: 'style', use: ['css', 'less'] }) },
            { test: /\.component\.less$/, use: ['raw', 'less'] },

            { test: require.resolve('jquery'), use: ['expose?jQuery'] },
            { test: require.resolve('bootstrap'), use: ['imports?jquery'] },
            { test: require.resolve('cropper'), use: ['imports?jquery,style=cropper/dist/cropper.css'] },
            { test: require.resolve('clockpicker/dist/jquery-clockpicker.js'), use: ['imports?jquery,bootstrap,style=clockpicker/dist/jquery-clockpicker.css'] },
            { test: require.resolve('bootstrap-datepicker'), use: ['imports?jquery,bootstrap,style=bootstrap-datepicker/dist/css/bootstrap-datepicker.css'] },
            { test: require.resolve('bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min'), use: ['imports?datepickerCore'] },
            { test: require.resolve('pnotify'), use: ['imports?jquery,style=pnotify-style'] },
            { test: require.resolve('fullcalendar'), use: ['imports?moment,jquery,bootstrap,style=fullcalendar/dist/fullcalendar.css'] },
            { test: require.resolve('bootstrap-daterangepicker'), use: ['imports?jquery,moment,style=bootstrap-daterangepicker/daterangepicker.css'] },
            { test: require.resolve('chosen-js'), use: ['imports?jquery,style=chosen-js/chosen.css'] },
            { test: require.resolve('magnific-popup'), use: ['imports?jquery,style=magnific-popup-style'] },
        ]
    },
    
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor.angular',
            chunks: ['index', 'vendor.angular']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['index', 'signin', 'vendor.angular']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            moment: 'moment'
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['index', 'vendor.angular', 'vendor'],
        //     filename: 'index.html',
        //     template: './src/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     chunks: ['signin', 'vendor'],
        //     filename: 'signin.html',
        //     template: './src/signin.html'
        // })
    ],
    externals: {
        AMap: 'window.AMap',
        BankUtils: 'window.BankUtils',
        // jquery: 'window.jQuery'
    },
    entry: {
        'index': './src/index.ts',
        'signin': './src/signin.ts',
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'vendor.angular': './src/vendor.angular.ts',
    }
};