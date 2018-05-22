'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var path = require('path');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');

var argv = require('yargs')
	.option('output', {alias: 'o', default: 'dist'})
	.option('samples-dir', {default: 'samples'})
	.option('docs-dir', {default: 'docs'})
	.option('www-dir', {default: 'www'})
	.argv;

gulp.task('default', ['build']);

gulp.task('lint', function() {
	var files = [
		'samples/**/*.js',
		'src/**/*.js',
		'test/**/*.js',
		'*.js'
	];

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

function watch(glob, task, done) {
	gutil.log('Waiting for changes...');
	return gulp.watch(glob, task)
		.on('end', done)
		.on('change', function(e) {
			gutil.log('Changes detected for', path.relative('.', e.path), '(' + e.type + ')');
		});
}

gulp.task('build', function(done) {
	var out = argv.output;
	var task = function() {
		return rollup('rollup.config.js')
			.pipe(source(pkg.name + '.js'))
			.pipe(gulp.dest(out))
			.pipe(rename(pkg.name + '.min.js'))
			.pipe(streamify(uglify({output: {comments: 'some'}})))
			.pipe(gulp.dest(out));
	};

	return argv.watch
		? [task(), watch('src/**/*.js', task, done)]
		: task();
});
