var documentation = require('documentation');
var through2 = require('through2');
var File = require('vinyl');

/**
 * Documentation stream intended for use within the gulp system.
 *
 * @name documentation
 * @param {string} [format=md] format - one of 'html', 'md', or 'json'
 * @param {Object} options documentation options - the same as given to [documentation](https://github.com/documentationjs/documentation)
 * @param {string} options.filename custom filename for md or json output
 * @param {Object} formatterOptions output options - same as given to documentation
 * @param {Object} formatterOptions.name if format is HTML, specifies the name of the project
 * @returns {stream.Transform}
 * @example
 * var gulpDocumentation = require('gulp-documentation'),
 * var gulp = require('gulp');
 * //  Out of the box, you can generate JSON, HTML, and Markdown documentation
 * gulp.task('documentation-readme-example', function () {
 *   // Generating README documentation
 *   return gulp.src('./index.js')
 *     .pipe(gulpDocumentation('md'))
 *     .pipe(gulp.dest('md-documentation'));
 * });
 * 
 * // Generating a pretty HTML documentation site
 * gulp.task('documentation-html-example', function () {
 *   return gulp.src('./index.js')
 *     .pipe(gulpDocumentation('html'))
 *     .pipe(gulp.dest('html-documentation'));
 * });
 * 
 * // Generating raw JSON documentation output
 * gulp.task('documentation-json-example', function () {
 *   return gulp.src('./index.js')
 *     .pipe(gulpDocumentation('json'))
 *     .pipe(gulp.dest('json-documentation'));
 * });
 * 
 * // Generate documentation for multiple files using normal glob syntax.
 * // Note that this generates one documentation output, so that it can
 * // easily cross-reference and use types.
 * gulp.task('documentation-multiple-files', function () {
 *   return gulp.src('./src/*.js')
 *     .pipe(gulpDocumentation('md'))
 *     .pipe(gulp.dest('md-documentation'));
 * });
 * 
 * 
 * // If you're using HTML documentation, you can specify additional 'name'
 * // and 'version' options
 * gulp.task('documentation-html-options', function () {
 *   return gulp.src('./src/*.js')
 *     .pipe(gulpDocumentation('html', {}, {
 *       name: 'My Project',
 *       version: '1.0.0'
 *     }))
 *     .pipe(gulp.dest('html-documentation'));
 * });
 *
 * // Document non-JavaScript files with JSDoc comments using polyglot: true
 * gulp.task('documentation-for-cplusplus', function () {
 *   return gulp.src('./src/*.cpp')
 *     .pipe(gulpDocumentation('html', { polyglot: true }, {
 *       name: 'My Project',
 *       version: '1.0.0'
 *     }))
 *     .pipe(gulp.dest('html-documentation'));
 * });
 */
module.exports = function(format, options, formatterOptions) {
  options = options || {};
  formatterOptions = formatterOptions || {};
  var files = [];
  format = format || 'md';
  var formatter = documentation.formats[format];
  if (!formatter) {
    throw new Error(
      'invalid format given: valid options are ' +
        Object.keys(documentation.formats).join(', ')
    );
  }
  return through2.obj(
    function document(file, enc, cb) {
      files.push(file);
      cb();
    },
    function(cb) {
      documentation.build(
        files.map(function(file) {
          return file.path;
        }),
        options,
        function(err, comments) {
          formatter(
            comments,
            formatterOptions,
            function(err, output) {
              if (format === 'json' || format === 'md') {
                this.push(
                  new File({
                    path: options.filename || 'API.' + format,
                    contents: new Buffer(output)
                  })
                );
              } else if (format === 'html') {
                output.forEach(
                  function(file) {
                    this.push(file);
                  }.bind(this)
                );
              }
              cb();
            }.bind(this)
          );
        }.bind(this)
      );
    }
  );
};
