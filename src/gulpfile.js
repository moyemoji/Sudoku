//第二步配置gulpfile，设置一些自动构建任务，比如es6->es5，比如less->css
const gulp = require("gulp")

// 转译Javascript
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js");
    //资源文件-转译函数-输出存储位置
    gulp.src("./js/**/*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"));
});

// 转译less -> css
gulp.task("less", () => {
    const less = require("gulp-less");
    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"));
});

gulp.task("default", ["webpack", "less"]);

gulp.task("watch", () => {
    gulp.watch("less/**/*.less", ["less"]);
    gulp.watch("js/**/*.js", ["webpack"]);
});
