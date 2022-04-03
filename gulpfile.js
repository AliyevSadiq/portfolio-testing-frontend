const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/assets/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html-minify'));
    gulp.watch("src/assets/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/assets/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/assets/img/**/*").on('all', gulp.parallel('images'));
    gulp.watch("src/assets/icons/**/*").on('all', gulp.parallel('icons'));
})

gulp.task('html-minify', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src('src/assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.stream());
});

gulp.task('icons', () => {
    return gulp.src('src/assets/icons/**/*')
        .pipe(gulp.dest('dist/assets/icons'))
        .pipe(browserSync.stream());
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles','scripts','fonts','images','icons','html-minify'));