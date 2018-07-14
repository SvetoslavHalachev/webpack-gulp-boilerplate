/**
 * @ External dependencies.
 */
const gulp          = require('gulp');
const notify        = require('gulp-notify');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const sourcemaps    = require('gulp-sourcemaps');
const plumber       = require('gulp-plumber');
const del           = require('del');
const browserSync   = require('browser-sync');
const webpackStream = require('webpack-stream');
const webpack       = require('webpack');

/**
 * @ Internal dependencies.
 */
const browserSyncConfig = require('./browsersync');
const webpackConfig     = require('./webpack.config');

/**
 * @ The supported paths
 */
const paths = {
	src: '../src',
	dev: '../dev',
	css: '/css',
	scripts: {
		entry: '../src/js/main.js'
	}
};

/**
 * @ Handle custom path
 */
const handlePath = (
	defaultPath,
	additionalPath
) => defaultPath + additionalPath;

/**
 * @ Exclude custom path
 */
const excludePath = (
	defaultPath,
	additionalPath
) => '!' + handlePath(defaultPath, additionalPath);

/**
 * @ Handle error
 */
const handleError = function(err) {
	notify.onError({
		title: 'Gulp',
		subtitle: 'Failure!',
		message: 'Error: <%= error.message %>'
	})(err);

	this.emit('end'); 
};

/**
 * @ Handle page reload
 */
const handleReload = () => browserSync(browserSyncConfig);

/**
 * @ Handle dev folder copy
 */
const handleCopy = () => gulp.src([
	handlePath(paths.src, '/**'),
	excludePath(paths.src, '/{css,scss,fonts,images,js}'),
	excludePath(paths.src, '/{css,scss,fonts,images,js}/**')
]).pipe(
	plumber({
		errorHandler: handleError
	})
).pipe(
	gulp.dest(
		paths.dev
	)
);

/**
 * @ Handle dev folder clean
 */
const handleClean = () => del(
	[
		paths.dev
	],
	{
		force: true
	}
);

/**
 * @ Handle javascript files through webpack
 */
const handleScripts = () => gulp.src(
	paths.scripts.entry
).pipe(
	plumber({
		errorHandler: handleError
	})
).pipe(
	webpackStream(
		webpackConfig,
		webpack
	)
).pipe(
	gulp.dest(
		paths.dev
	)
);

/**
 * @ Handle html files
 */
const handleHtml = () => gulp.src([
	handlePath(paths.src, '/**/*.html')
]).pipe(
	plumber({
		errorHandler: handleError
	})
).pipe(
	gulp.dest(
		paths.dev
	)
);

const handleSass = () => gulp.src([
	handlePath(paths.src, '/sass/**/*.scss')
]).pipe(
	sourcemaps.init()
).pipe(
	sassGlob()
).pipe(
	sass({
		outputStyle: 'compressed'
	}).on('error', handleError)
).pipe(
	plumber({
		errorHandler: handleError
	})
).pipe(
	sourcemaps.write()
).pipe(
	gulp.dest(
		handlePath(paths.dev, paths.css)
	)
);

/**
 * @ Handle folders watch
 */
const handleWatch = () => {
	gulp.watch(
		handlePath(paths.src, '/**/*.js'),
		handleScripts
	);

	gulp.watch(
		handlePath(paths.src, '/**/*.html'),
		handleHtml
	);

	gulp.watch(
		handlePath(paths.src, '/sass/**/*.scss'),
		handleSass
	);
};

/**
 * @ Register gulp dev task
 */
gulp.task('dev',
	gulp.series(
		handleClean,
		gulp.parallel(
			handleSass,
			handleHtml,
			handleScripts,
			handleWatch,
			handleReload
		)
	)
);

/**
 * @ Register gulp default task
 */
gulp.task('default', 
	gulp.parallel('dev')
);
