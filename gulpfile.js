'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var merge = require('merge2');
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

gulp.task('samples', function() {
	// since we moved the dist files one folder up (package root), we need to rewrite
	// samples src="../dist/ to src="../ and then copy them in the /samples directory.
	var out = path.join(argv.output, argv.samplesDir);
	return gulp.src('samples/**/*', {base: 'samples'})
		.pipe(streamify(replace(/src="((?:\.\.\/)+)dist\//g, 'src="$1', {skipBinary: true})))
		.pipe(gulp.dest(out));
});

gulp.task('package', ['build', 'samples'], function() {
	var out = argv.output;
	var streams = merge(
		gulp.src(path.join(out, argv.samplesDir, '**/*'), {base: out}),
		gulp.src([path.join(out, '*.js'), 'LICENSE.md'])
	);

	return streams
		.pipe(zip(pkg.name + '.zip'))
		.pipe(gulp.dest(out));
});
