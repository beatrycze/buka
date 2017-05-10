var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

var appJs = ['./src/app.js', './src/utils.js', './src/model.js']; // przypisuję do zmiennej, bo DRY :)
var templatesHbs = ['./src/templates/*.hbs'];

gulp.task('scripts', function() {
  return gulp.src(appJs)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('templates', function(){
  gulp.src(templatesHbs)
    .pipe(handlebars({
      handlebars: require('handlebars') // Compiling using a specific Handlebars version
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'app.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch([appJs], ['scripts']);
    gulp.watch([templatesHbs], ['templates']);
});

gulp.task('default', ['scripts', 'templates']);
