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
var gulpDocumentation = require('gulp-documentation'),
    gulp = require('gulp');

/**
 * Out of the box, you can generate JSON, HTML, and Markdown documentation
 */
gulp.task('documentation', function () {

  // Generating README documentation
  gulp.src('./index.js')
    .pipe(gulpDocumentation({ format: 'md' }))
    .pipe(gulp.dest('md-documentation'));

  // Generating a pretty HTML documentation site
  gulp.src('./index.js')
    .pipe(gulpDocumentation({ format: 'html' }))
    .pipe(gulp.dest('html-documentation'));

  // Generating raw JSON documentation output
  gulp.src('./index.js')
    .pipe(gulpDocumentation({ format: 'json' }))
    .pipe(gulp.dest('json-documentation'));

});

/**
 * Generate documentation for multiple files using normal glob syntax.
 * Note that this generates one documentation output, so that it can
 * easily cross-reference and use types.
 */
gulp.task('documentation', function () {

  gulp.src('./src/*.js')
    .pipe(gulpDocumentation({ format: 'md' }))
    .pipe(gulp.dest('md-documentation'));

});
```
