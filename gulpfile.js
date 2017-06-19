const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");

const path = require('path');

gulp.task("default", () => {
    return browserify({ basedir: '.', debug: true, entries: ['main.ts'], cache: {}, packageCache: {} })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
    }
);

const express = require('express');

const port = 3070;

const server = express()
    // 静态资源文件存放路径
    .use(express.static(path.join(__dirname, './')));

gulp.task('run', ['default'], () => {
    server.listen(port, () => console.log(`Server running`));

    // browserSync.init(null, {
    //     proxy: 'http://localhost:' + port,
    //     files: [filepath.css, filepath.js, filepath.view],
    //     notify: false,1bc19a 
    //     open: false,
    //     port: port + 2000
    // });
});