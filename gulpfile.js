

// gulp.task(taskname,callback):创建任务 ---  taskname 任务名  callback 回调函数 
// gulp.src():设置引入文件的路径
// gulp.dest();输出文件设置（如果不存在目录名，自动生成）
// pipe():管道流（将我们的任务链式连接起来）
//gulp + 任务名  ---- 执行任务

// gulp-minify-html  压缩html的模块
// gulp-minify-css   压缩css的模块
// gulp-uglify       压缩js的模块

//es6 转换成 es5的三个模块
//gulp-babel@7 babel-core babel-preset-es2015

//gulp-watch 监听模块

//5.编译sass,同时生成.map文件(.map调式文件)
// gulp - sass gulp - sourcemaps gulp - load - plugins

//6.图片压缩插件-imagemin@6
//对png最大的压缩，其他的格式几乎压不动。



const gulp = require('gulp');// 引入gulp模块生成gulp对象
const gulpHtml = require('gulp-minify-html'); // 压缩html文件
const gulpCss = require('gulp-minify-css'); // 压缩css文件
const gulpJs = require('gulp-uglify');  // 压缩js文件

//es6 转换成 es5的三个模块
//gulp-babel@7 babel-core babel-preset-es2015
const babel = require('gulp-babel');
const babelCore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//gulp-watch 监听模块
const watch = require('gulp-watch');

//压缩Html
gulp.task('ysHtml', () => {//html
    return gulp.src('src/html/*.html')
        .pipe(gulpHtml())
        .pipe(gulp.dest('online/html/'))
});


//压缩css
gulp.task('ysCss', () => {//css
    return gulp.src('src/css/*.css')
        .pipe(gulpCss())
        .pipe(gulp.dest('online/css/'))
});

//压缩js，同时也将es6 转换成 es5
gulp.task('ysJs', () => {//js
    return gulp.src('src/js/*.js')
        .pipe(babel({//先将es6转换成es5
            presets: ['es2015']
        }))
        .pipe(gulpJs())
        .pipe(gulp.dest('online/js/'))
})

//任务名为default,直接gulp运行，默认任务名.

// gulp-watch  ----  监听模块
gulp.task('default', function () {
    watch(['src/html/*.html', 'src/css/*.css', 'src/js/*,js'], gulp.parallel('ysHtml', 'ysCss', 'ysJs'));
});