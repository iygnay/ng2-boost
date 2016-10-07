
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var rename = require('gulp-rename');
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");

var PATH = {
    sassModuleFiles: "themes/*.scss",
    sassSourceFiles: "themes/**/*.scss",
    themesDist: "themes/dist",
}

gulp.task("sass", function () {
    return gulp.src(PATH.sassModuleFiles)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer("safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(gulp.dest(PATH.themesDist))
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(PATH.themesDist));
});

gulp.task('watch', function () {
    gulp.watch(PATH.sassSourceFiles, ['sass'], () => { });
    gulp.watch('modules/**/*.html', ['copy-html'], () => { });
});

gulp.task('copy-html', () => {
    gulp.src('modules/**/*.html')
        .pipe(gulp.dest('./build/jit/modules'));
});

gulp.task('copy-res', () => {
    // gulp.src('themes/res/**/*.*')
    //     .pipe(gulp.dest('../GeMiQi.Web/themes/res'));
});

gulp.task('copy-all', ['copy-html', 'copy-res'], () => {
});