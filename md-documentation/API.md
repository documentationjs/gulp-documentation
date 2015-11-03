# documentation

Documentation stream intended for use within the gulp system.


**Parameters**

-   `options` **Object** output options
    -   `options.format` **string** either 'html', 'md', 'json', or 'docset'

    -   `options.filename` **string** custom filename for md or json output



**Examples**

```javascript
var documentation = require('./'),
    gulp = require('gulp');

gulp.task('documentation', function () {
  gulp.src('./index.js')
    .pipe(documentation({
      format: 'html'
    }))
    .pipe(gulp.dest('documentation'));
});

// documentation with JSON output, default filename API.md
gulp.task('documentation-json', function () {
  gulp.src('./index.js')
    .pipe(documentation({
      format: 'json'
    }))
    .pipe(gulp.dest('documentation'));
});

// documentation with markdown output, default filename API.md
gulp.task('documentation-md', function () {
  gulp.src('./index.js')
    .pipe(documentation({
      format: 'md'
    }))
    .pipe(gulp.dest('documentation'));
});
```



Returns **stream.Transform** 



