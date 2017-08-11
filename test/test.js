var test = require('tap').test,
  path = require('path'),
  concat = require('concat-stream'),
  gulp = require('gulp'),
  documentation = require('../');

test('gulp-documentation', function(t) {
  t.ok(documentation());
  t.end();
});

test('gulp-documentation md', function(t) {
  gulp
    .src(path.join(__dirname, '/fixture.js'))
    .pipe(documentation('md', {}, {}))
    .on('data', function(d) {
      t.equal(d.path, 'API.md');
      t.end();
    });
});

test('gulp-documentation md custom name', function(t) {
  gulp
    .src(path.join(__dirname, '/fixture.js'))
    .pipe(documentation('md', { filename: 'foo.md' }))
    .on('data', function(d) {
      t.equal(d.path, 'foo.md');
      t.end();
    });
});

test('gulp-documentation json', function(t) {
  gulp
    .src(path.join(__dirname, '/fixture.js'))
    .pipe(documentation('json'))
    .on('data', function(d) {
      t.ok(JSON.parse(d.contents), 'is json');
      t.end();
    });
});

test('gulp-documentation html', function(t) {
  gulp
    .src(path.join(__dirname, '/fixture.js'))
    .pipe(documentation('html'))
    .pipe(
      concat(function(d) {
        t.ok(d.length === 34 || d.length === 36);
        t.end();
      })
    );
});

test('gulp-documentation exit callback', function(t) {
  t.plan(1);
  gulp
    .src(path.join(__dirname, '/fixture.js'))
    .pipe(documentation('md'))
    .on('end', function() {
      t.pass();
    })
    .resume();
});
