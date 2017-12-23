var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

/*------------------------------------------------------
DEV TASKS - gulp default
------------------------------------------------------*/
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);

gulp.task('dev', ['sass'], function() {

  browserSync({
    server:{
      baseDir:''
    }
  });

    gulp.watch(['scss/**/*.scss'], ['sass-watch']);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});


/*------------------------------------------------------
PRODUCTION TASKS - gulp prod
------------------------------------------------------*/
//var useref = require('gulp-useref');
//var uglify = require('gulp-uglify');
//var gulpIf = require('gulp-if');
//var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('*.html')
  .pipe($.useref())
  .pipe($.if('js/*.js', $.uglify()))
  .pipe($.if('*.css', $.cssnano()))
  .pipe(gulp.dest('dist'))
});

gulp.task('copy-imgs', function() {
  return gulp.src('imgs/**/*')
  .pipe(gulp.dest('dist/imgs'))
})

gulp.task('copy-fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('prod', ['useref' /*'copy-imgs', 'copy-fonts'*/], function (){
  console.log('Building files');
})
