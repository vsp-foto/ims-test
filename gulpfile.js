var gulp           = require('gulp');
var webserver      = require('gulp-webserver');

var BASE_PATH_SRC = 'src';
var BASE_PATH_DIST = '../dist';

gulp.task('serve', function() {
    gulp.src(BASE_PATH_SRC)
            .pipe(webserver({
                livereload: {enable: true, port: 35728},
                open: true,
                port: 3000
            }));
});
