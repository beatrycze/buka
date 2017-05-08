var gulp = require('gulp');
var concat = require('gulp-concat');

var appJs = ['./src/app.js', './src/utils.js', './src/model.js'];

gulp.task('scripts', function() {
//   return gulp.src('./lib/*.js')
  return gulp.src(appJs)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch([appJs], ['scripts']);
});

gulp.task('default', ['scripts']);
