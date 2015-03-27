/* global gulp */
var documentation = require('../');

gulp.task('documentation', function () {
  gulp.src('./index.js')
    .pipe(documentation({}));
});
