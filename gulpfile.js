var gulp = require('gulp');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var connect = require('gulp-connect');
var panini = require('panini');
var rimraf = require('rimraf');

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('pages', function() {
  gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('build'))
    .on('finish', function(){
        gulp.run('livereload');
    });
});

gulp.task('pages:reset', function(done) {
  panini.refresh();
  gulp.run('pages');
  done();
});

gulp.task('sass', function(){
    return gulp.src('./sass/**/*.scss')
        .pipe(sass( { errLogToConsole: true }))
        .pipe(gulp.dest('./build/css'))
        .on('finish', livereloadaoe);
});

gulp.task('js', function(){
    return gulp.src(['./bower_components/foundation/js/foundation/foundation.js', './bower_components/foundation/js/foundation/foundation.magellan.js', './bower_components/jquery/dist/jquery.js'])
        .pipe(gulp.dest('./build/js'))
        .on('finish', livereloadaoe);
});

function livereloadaoe() {
    gulp.run('livereload');
}

gulp.task('assets', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('livereload', function() {
    gulp.src('./build/**/*').pipe(connect.reload());
})

gulp.task('build', function() {
    gulp.run(['pages', 'sass', 'js', 'assets'])
})

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./src/pages/**/*', ['pages']);
    gulp.watch(['src/{layouts,partials,pages}/**/*'], ['pages:reset']);
    gulp.watch('./assets/**/*', ['assets']);
});

gulp.task('default', ['pages', 'connect', 'watch', 'sass', 'js', 'assets']);