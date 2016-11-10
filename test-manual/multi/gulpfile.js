var gulpDocumentation = require('../../'),
  gulp = require('gulp');

gulp.task('documentation', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation({ format: 'md' }))
    .pipe(gulp.dest('md-documentation'));

});

gulp.task('documentation-shallow', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation({ shallow: true, format: 'md' }))
    .pipe(gulp.dest('md-documentation'));

});
