const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function  style(){
    // 1.where is my scss file
    return gulp.src('./src/scss/**/*.scss')
        // 2.pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
         // 3.where do i save the compiled css?
        .pipe(gulp.dest('./css'))

        // 4.trem changes to all browser
        .pipe(browserSync.stream());

}
// gulp will do the auto sync of all the files

function watch(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;