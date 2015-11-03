# gulp-documentation

[![Circle CI](https://circleci.com/gh/documentationjs/gulp-documentation.svg?style=svg)](https://circleci.com/gh/documentationjs/gulp-documentation)

Use [gulp](http://gulpjs.com/) with
[documentation](https://github.com/documentationjs/documentation)
to generate great documentation for your JavaScript projects.

| name | description |
| ---- | ----------- |
| `options` | output options |
| `options.format` | either &#x27;html&#x27;, &#x27;md&#x27;, &#x27;json&#x27;, or &#x27;docset&#x27; |
| `options.filename` | custom filename for md or json output |

Returns `stream.Transform`

## Installation

```sh
$ npm install --save-dev gulp-documentation
```

## Example

```js
var documentation = require('gulp-documentation'),
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
```
