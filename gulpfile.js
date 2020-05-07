const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function  style(){
    // 1.where is my scss file
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','./src/scss/*.scss'])
        // 2.pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
         // 3.where do i save the compiled css?
        .pipe(gulp.dest('./src/css'))

        // 4.trem changes to all browser
        .pipe(browserSync.stream());

}
// gulp will do the auto sync of all the files

function watch(){
    browserSync.init({
        server:{
            baseDir: './src'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('node_modules/font-awesome/fonts/*', fonts);
    gulp.watch('node_modules/font-awesome/css/font-awesome.min.css', fa);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}


//  move the fonts folder to src/fonts
function  fonts(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
}

//  move the font awesome css to src/css
function  fa(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
}
// move js files to src/js
function js(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}



exports.style = style;
exports.watch = watch;
exports.fonts = fonts;
exports.fa = fa;
exports.js = js;