var gulp    = require('gulp');
var pkg     = require('./package.json');

// plugin宣言
var coffee  = require('gulp-coffee');
var uglify  = require('gulp-uglify');
var lessc   = require('gulp-less');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var header  = require('gulp-header');
var server  = require('gulp-webserver');

// html copy
gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public'));
});

// coffee -> js
gulp.task('js', function() {
    gulp.src('./src/coffee/*.coffee')
        .pipe(plumber())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(header('/* copyright <%= pkg.name %> */', {pkg: pkg}))
        .pipe(gulp.dest('./public/js'));
});

// less -> css
gulp.task('less', function() {
    gulp.src('./src/less/*.less')
        .pipe(lessc())
        .pipe(gulp.dest('./public/css'));
});

// jade -> html
gulp.task('jade', function() {
    gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public'))
});

// watch
gulp.task('watch', function() {
    gulp.watch('./src/coffee/*.coffee', ['js']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.less', ['less']);
});

// webserver
// docker内部だとうまく使えない
/*
gulp.task('webserver', function() {
    gulp.src('./public')
        .pipe(
            server({
                host: '172.17.0.10',
                livereload: true
            })
        );
});
*/

gulp.task('default', ['html', 'js', 'less', 'jade', 'watch']);
