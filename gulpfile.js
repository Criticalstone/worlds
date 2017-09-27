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
        .pipe(gulp.dest('./build/css'));
});

// gulp.task('livereload', function() {
//     sequence('sass', 'pages', 'reloads'); 
// });

gulp.task('livereload', function() {
    gulp.src('./build/**/*').pipe(connect.reload());
})

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['livereload']);
    gulp.watch('./src/pages/**/*', ['pages']);
    gulp.watch(['src/{layouts,partials,pages}/**/*'], ['pages:reset']);
});

gulp.task('default', ['pages', 'connect', 'watch', 'sass']);