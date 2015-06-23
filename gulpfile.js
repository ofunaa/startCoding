var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
 

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./html"
        }
    });
});


//sassからの変更
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
    	//エラーしてもwatchを継続
    	.pipe(plumber())
    	//guide作成
    	.pipe(frontnote({
            css: './css/style.css'
        }))
        .pipe(sass())
        //プリフェックス
        .pipe(autoprefixer())
        //出力先設定
        .pipe(gulp.dest("./css"))
        //auto-reload
        .pipe(browser.reload({stream:true}));
});


//jsのminified
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
    	//エラーしてもwatchを継続
    	.pipe(plumber())
        .pipe(uglify())
        //出力先設定
        .pipe(gulp.dest("./js/min"))
        //auto-reload
        .pipe(browser.reload({stream:true}));
});

//watch
gulp.task('default', function(){
	gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
  	gulp.watch('sass/**/*scss', ['sass']);
});