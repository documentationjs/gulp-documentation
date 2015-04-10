var test = require('prova'),
    path = require('path'),
    gulp = require('gulp'),
    documentation = require('../');

test('gulp-documentation', function(t) {
    t.ok(documentation());
    t.end();
});

test('gulp-documentation md', function(t) {
    gulp.src(path.join(__dirname, '/fixture.js'))
        .pipe(documentation({ format: 'md' }))
        .on('data', function(d) {
            t.equal(d.path, 'API.md');
            t.end();
        });
});

test('gulp-documentation md custom name', function(t) {
    gulp.src(path.join(__dirname, '/fixture.js'))
        .pipe(documentation({ format: 'md', filename: 'foo.md' }))
        .on('data', function(d) {
            t.equal(d.path, 'foo.md');
            t.end();
        });
});
