var through2 = require('through2'),
  File = require('vinyl');

/**
 * Documentation stream intended for use within the gulp system.
 *
 * @name documentation
 * @param {Object} options output options
 * @param {string} options.format either 'html', 'md', 'json', or 'docset'
 * @param {string} options.filename custom filename for md or json output
 * @param {Object} [documentation] your custom instance of documentation.js
 * @returns {stream.Transform}
 * @example
 * var documentation = require('./'),
 *     gulp = require('gulp');
 *
 * gulp.task('documentation', function () {
 *   gulp.src('./index.js')
 *     .pipe(documentation({
 *       format: 'html'
 *     }))
 *     .pipe(gulp.dest('documentation'));
 * });
 *
 * // documentation with JSON output, default filename API.md
 * gulp.task('documentation-json', function () {
 *   gulp.src('./index.js')
 *     .pipe(documentation({
 *       format: 'json'
 *     }))
 *     .pipe(gulp.dest('documentation'));
 * });
 *
 * // documentation with markdown output, default filename API.md
 * gulp.task('documentation-md', function () {
 *   gulp.src('./index.js')
 *     .pipe(documentation({
 *       format: 'md'
 *     }))
 *     .pipe(gulp.dest('documentation'));
 * });
 * 
 * 
 * // documentation with JSON output, default filename API.md and custom Documentation instance
 * var documentation = require('gulp-documentation'),
 *     $documentation = require('documentation');
 *     
 * 
 * gulp.task('documentation-json', function () {
 *   gulp.src('./index.js')
 *     .pipe(documentation({
 *       format: 'json'
 *     }, $documentation))
 *     .pipe(gulp.dest('documentation'));
 * });
 *
 */
module.exports = function (options, documentation) {
  options = options || {};
  documentation = documentation || require('documentation');

  var docOptions = {
    github : !!(options.github || options.g),
    shallow: options.shallow || false
  };
  var files = [];
  options.format = options.format || 'html';
  var formatter = documentation.formats[options.format];
  if (!formatter) {
    throw new Error('invalid format given: valid options are ' + Object.keys(documentation.formats).join(', '));
  }
  return through2.obj(function document(file, enc, cb) {
    files.push(file);
    cb();
  }, function (cb) {
    documentation(files.map(function(file) {
      return file.path;
    }), docOptions, function(err, comments) {
      formatter(comments, {}, function (err, output) {
        if (options.format === 'json' || options.format === 'md') {
          this.push(new File({
            path: options.filename || 'API.' + options.format,
            contents: new Buffer(output)
          }));
        } else if (options.format === 'html') {
          output.forEach(function(file) {
            this.push(file);
          }.bind(this));
        }
        cb();
      }.bind(this));
    }.bind(this));
  });
};
