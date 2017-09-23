const gulp = require("gulp");
const util = require("gulp-util");
const sequence = require('gulp-sequence');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');

const notify = require("gulp-notify");

const path = require('path');
const del = require('del');

const express = require('express');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackDevServer = require("webpack-dev-server");

// 读取配置文件
const config = require('./config');

let distDir = path.join(__dirname, config.gulp.distDir || 'dist');
let srcDir = path.join(__dirname, config.gulp.srcDir || 'src');

let release = false;

let files = {
    'ts': path.join(srcDir, '**/*.ts'),
    'html': path.join(srcDir, '**/*.html'),
    'assets': path.join(srcDir, 'assets/**/*')
};

// 错误处理
let handlerError = function (e) {
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args); //替换为当前对象

    this.emit('end');
};

gulp.task('webpack', () => {

    let mode;
    let stage = util.env.stage || util.env.s;
    let local = util.env.localhost || util.env.l || util.env.local;

    if (release) {
        mode = !!stage ? 'stage' : 'production';
    } else {
        mode = !!local ? 'localhost' : 'development';
    }

    return gulp.src('')
        .pipe(webpackStream(require(`./webpack.${mode}.js`), webpack))
        .on('error', handlerError)
        .pipe(gulp.dest(distDir));
});

gulp.task('resolve:assets', () => {
    return gulp.src(files.assets)
        .pipe(gulp.dest(path.join(distDir, 'assets')));
});

gulp.task('resolve:html', () => {

    let options = {
        //清除HTML注释
        removeComments: true,

        //压缩HTML
        collapseWhitespace: true,

        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,

        //压缩页面JS
        minifyJS: true,

        //压缩页面CSS
        minifyCSS: true
    };

    let stream = gulp.src(files.html);

    if (release) {
        stream.pipe(htmlmin(options)).on('error', handlerError);
    }

    return stream.pipe(gulp.dest(distDir));
});


let onUnlinkEvent = (file) => {
    // Simulating the {base: 'src'} used with gulp.src in the scripts task
    let filePathFromSrc = path.relative(path.resolve('src'), file);

    // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
    let destFilePath = path.resolve('dist', filePathFromSrc);

    del.sync(destFilePath);
}

gulp.task('watch', ['resolve:assets', 'resolve:html'], () => {
    watch(files.html, event => gulp.start('resolve:html')).on('unlink', onUnlinkEvent);
    watch(files.assets, event => gulp.start('resolve:assets')).on('unlink', onUnlinkEvent);;
});

gulp.task('run:server', ['watch'], (cb) => {
    express()
        .use(express.static(distDir))
        .listen(config.port, cb);
});

gulp.task('clean', () => del([path.join(distDir, '**/*')]));

// 开发流程构建任务
let devloperTasks = [
    'webpack',
    'resolve:assets',
    'resolve:html',
    'run:server',
    'watch'
];

gulp.task('dev', (cb) => {
    sequence('clean', devloperTasks)(cb)
});

// 发布流程构建任务
let releaseTasks = [
    'webpack',
    'resolve:assets',
    'resolve:html'
];

gulp.task('release', (cb) => {
    release = true;
    sequence('clean', releaseTasks)(cb);
});

// gulp release 发布：生产环境
// gulp release -s  发布：演示环境
// gulp release -stage

// gulp dev
// gulp dev -l
// gulp dev -local
// gulp dev -localhost