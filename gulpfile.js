const gulp = require("gulp");
const less = require('gulp-less');
const source = require('vinyl-source-stream');

const notify = require("gulp-notify");

const path = require('path');
const del = require('del');

const express = require('express');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

// 读取配置文件
const config = require('./config');

let webpackConfig = require('./webpack.config');

let distDir = path.join(__dirname, config.gulp.distDir || 'dist');
let srcDir = path.join(__dirname, config.gulp.srcDir || 'src');

let files = {
    'ts': path.join(srcDir, '**/*.ts'),
    'less': path.join(srcDir, 'less/**/*.less'),
    'html': path.join(srcDir, '**/*.html'),
    'assets': path.join(srcDir, 'assets/**/*')
};

// 错误处理
let handlerError = function () {
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象

    this.emit(); //提交
};

gulp.task('angular-compile', () => {
    webpackConfig.watch = true;
    return gulp.src('')
        .pipe(webpackStream(webpackConfig, webpack))
        .on('error', handlerError)
        .pipe(gulp.dest(distDir));
});

gulp.task('less-compile', () => {
    return gulp.src(files.less)
        .pipe(less())
        .on('error', handlerError)
        .pipe(gulp.dest(path.join(distDir, 'css')))
});

gulp.task('assets-resolve', () => {
    return gulp.src(files.assets)
        .pipe(gulp.dest(path.join(distDir, 'assets')));
});

gulp.task('html-resolve', () => {
    return gulp.src(files.html)
        .on('error', handlerError)
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', () => {
    gulp.watch(files.html, ['html-resolve']);
    gulp.watch(files.less, ['less-compile']);
    gulp.watch(files.assets, ['assets-resolve']);
});

gulp.task('run-server', () => {
    server.listen(config.port, () => console.log(`server running`));
});

gulp.task('clean', () => del([path.join(distDir, '**/*')]));

let devloperTasks = [
    'angular-compile',
    'less-compile',
    'assets-resolve',
    'html-resolve',
    'run-server',
    'watch'
];

const server = express()
    // 静态资源文件存放路径
    .use(express.static(distDir));

gulp.task('dev', devloperTasks);

gulp.task('release');