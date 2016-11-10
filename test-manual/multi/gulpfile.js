var gulpDocumentation = require('../../'),
  gulp = require('gulp');

gulp.task('documentation', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation('md'))
    .pipe(gulp.dest('md-documentation'));

});

gulp.task('documentation-shallow', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation('md', { shallow: true }))
    .pipe(gulp.dest('md-documentation'));

});

gulp.task('documentation-name', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation('html', { shallow: true }, { name: 'My Project' }))
    .pipe(gulp.dest('html-documentation'));

});
