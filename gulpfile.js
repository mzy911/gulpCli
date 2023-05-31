const gulp = require("gulp");

// **************  使用插件  **************
// 压缩 css
const cssmin = require("gulp-cssmin");
// 添加前缀
const antoPreFixer = require("gulp-autoprefixer");
// 将sass转换为css
// 内部依赖node-sass很容易下载失败
// 手动配置地址：set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass
const sass = require("gulp-sass")(require("sass"));
// 压缩 js：包含es6+语法会报错
const uglify = require("gulp-uglify");
// 转换 js：将高阶语法转为es5
const babel = require("gulp-babel");
// 压缩 html：压缩html
const htmlMin = require("gulp-htmlmin");

// **************  创建任务   **************
// 1、创建处理 css 的任务
// gulp@3 的写法
// gulp.task("cssHandler", function () {
//   // 必须使用 return 返回当前任务的结束
//   return gulp
//     .src("./src/css/*.css") // 源文件
//     .pipe(cssmin()) // 压缩css
//     .pipe(gulp.dest("./dist/css/")); // 存放到dist/css
// });
// gulp@4 的写法
const cssHandler = function () {
  // 必须使用 return 返回当前任务的结束
  return gulp
    .src("./src/css/*.css") // 源文件
    .pipe(antoPreFixer()) // 自动添加前缀
    .pipe(cssmin()) // 压缩css
    .pipe(gulp.dest("./dist/css/"));
};

// 2、创建处理 sass 的任务
const sassHandler = function () {
  // 必须使用 return 返回当前任务的结束
  return gulp
    .src("./src/css/*.scss") // 源文件
    .pipe(sass()) // 将sass转为css
    .pipe(antoPreFixer()) // 自动添加前缀
    .pipe(cssmin()) // 压缩css
    .pipe(gulp.dest("./dist/sass/"));
};

// 3、创建处理 js 的任务
const jsHandler = function () {
  return gulp
    .src("./src/js/*.js") // 源文件
    .pipe(
      babel({
        // babel@7
        // presets:['es2015']
        // babel@8
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify()) // 压缩js
    .pipe(gulp.dest("./dist/js/"));
};

// 4、创建处理 html 的任务
const htmlHandler = function () {
  return gulp
    .src("./index.html") // 源文件
    .pipe(
      htmlMin({
        collapseWhitespace: true, // 移除空格
        removeEmptyAttributes: true, // 移除空的属性，仅限于原生属性
        removeAttributeQuotes: true, // 移除属性上的双引号
        minifyCSS: true, // 语法内嵌式css
        minifyJS: true, // 压缩内嵌式js代码
      })
    ) // 压缩html
    .pipe(gulp.dest("./dist/"));
};

// 5、创建处理 images 的任务
const imagesHandler = function () {
  return gulp
    .src("./src/images/**") // 源文件
    .pipe(gulp.dest("./dist/images/"));
};

// 6、创建处理 第三方 的任务
const libHandler = function () {
  return gulp
    .src("./src/lib/**/*") // 源文件
    .pipe(gulp.dest("./dist/lib/"));
};

module.exports.cssHandler = cssHandler;
module.exports.sassHandler = sassHandler;
module.exports.jsHandler = jsHandler;
module.exports.htmlHandler = htmlHandler;
module.exports.imagesHandler = imagesHandler;
module.exports.libHandler = libHandler;
