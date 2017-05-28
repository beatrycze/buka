var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

var appJs = [ // przypisuję do zmiennej, bo DRY :)
  './src/app.js', 
  './src/utils.js', 
  './src/model.js'
];

var vendorsJs = [
  './node_modules/jquery/dist/jquery.js', 
  './node_modules/bootstrap/dist/js/bootstrap.js', 
  './node_modules/bootstrap-submenu/dist/js/bootstrap-submenu.js',
  './node_modules/jquery-form-validator/form-validator/jquery.form-validator.js',
  './node_modules/bootstrap-typeahead/js/bootstrap-typeahead.js', 
  './node_modules/handlebars/dist/handlebars.js'
];

var vendorsCss = [
  './node_modules/bootstrap/dist/css/bootstrap.css', 
  './node_modules/bootstrap-submenu/dist/css/bootstrap-submenu.min.css', 
  './node_modules/jquery-form-validator/form-validator/theme-default.css'
];

var templatesHbs = ['./src/templates/*.hbs'];

gulp.task('scripts-js', function() {
  return gulp.src(appJs)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('vendors-js', function() {
  return gulp.src(vendorsJs)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('vendors-css', function() {
  return gulp.src(vendorsCss)
    .pipe(concat('vendors.css'))
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
    gulp.watch([appJs], ['scripts-js']);
    gulp.watch([vendorsJs], ['vendors-js']);
    gulp.watch([vendorsCss], ['vendors-css']);
    gulp.watch([templatesHbs], ['templates']);
});

gulp.task('default', ['scripts-js', 'vendors-js', 'vendors-css', 'templates']);
