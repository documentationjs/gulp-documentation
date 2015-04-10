var through2 = require('through2'),
  File = require('vinyl'),
  concat = require('concat-stream'),
  documentation = require('documentation');

/**
 * Documentation stream intended for use within the gulp system.
 *
 * @name documentation
 * @param {Object} options output options
 * @param {string} options.format either 'html', 'md', 'json', or 'docset'
 * @param {string} options.filename custom filename for md or json output
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
 */
module.exports = function (options) {
  options = options || {};
  var files = [];
  options.format = options.format || 'html';
  var format = documentation.formats[options.format];
  if (!format) {
    console.error('invalid format given: valid options are ' + Object.keys(documentation.formats).join(', '));
  }
  return through2.obj(function document(file, enc, cb) {
    files.push(file);
    cb();
  }, function () {
    var that = this;
    documentation(files.map(function(file) {
      return file.path;
    }))
    .pipe(format(options))
    .pipe(concat(function (output) {
      if (typeof output === 'string') {
        that.push(new File({
          path: options.filename || 'API.' + options.format,
          contents: new Buffer(output)
        }));
      } else if (Array.isArray(output)) {
        output.forEach(function(f) {
          that.push(f);
        });
      } else {
        console.error('unknown type detected');
      }
    }));
  });
};
