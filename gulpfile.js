var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('script', function () {
        gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('src/build/js'));
});

gulp.task('sass', function () {
	gulp.src("src/scss/**/style.scss")
     .pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/build/css"));
    });


gulp.task('serve', ['sass','script'], function() {
        browserSync.init({
                server: {
                        baseDir: "./src"
                },
                notify: false,
                files: ['./src/**/*.html','./src/build/js/*.js','./src/build/css/*.css']
        });
});

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['script']);
});

gulp.task('default', ['watch','serve']);