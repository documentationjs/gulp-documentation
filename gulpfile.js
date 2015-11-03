var documentation = require('./'),
  gulp = require('gulp');

gulp.task('documentation', function () {

  gulp.src('./index.js')
    .pipe(documentation({ format: 'md' }))
    .pipe(gulp.dest('md-documentation'));

  gulp.src('./index.js')
    .pipe(documentation({ format: 'html' }))
    .pipe(gulp.dest('html-documentation'));

  gulp.src('./index.js')
    .pipe(documentation({ format: 'json' }))
    .pipe(gulp.dest('json-documentation'));

});
