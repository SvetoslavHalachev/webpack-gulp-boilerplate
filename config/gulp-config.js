/**
 * @ External dependencies.
 */
const gulp          = require('gulp');
const notify        = require('gulp-notify');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const plumber       = require('gulp-plumber');
const imagemin      = require('gulp-imagemin');
const gulpif        = require('gulp-if');
const del           = require('del');
const browsersync   = require('browser-sync');
const webpackStream = require('webpack-stream');
const webpack       = require('webpack');

/**
 * @ Internal dependencies.
 */
const { isDevEnv }  = require('./node-env');
const serverConfig  = require('./server-config');
const webpackConfig = require('./webpack.config');

/**
 * @ The supported paths
 */
const paths = {
	src: '../src',
	dev: '../dev',
	build: '../build',
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
 * @ Handle node environment paths
 */
const handleNodeEnvPath = (
	devPath,
	prodPath
) => isDevEnv ? devPath : prodPath;

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
const handleReload = () => browsersync(serverConfig);

/**
 * @ Handle dev folder clean
 */
const handleClean = () => del(
	[
		paths.dev,
		paths.build
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
		handleNodeEnvPath(
			/**
			 * @ Dev path
			 */
			paths.dev,

			/**
			 * @ Prod path
			 */
			paths.build
		)
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
		handleNodeEnvPath(
			/**
			 * @ Dev path
			 */
			paths.dev,

			/**
			 * @ Prod path
			 */
			paths.build
		)
	)
);

/**
 * @ Handle css files
 */
const handleSass = () => gulp.src([
	handlePath(paths.src, '/sass/**/*.scss')
]).pipe(
	plumber({
		errorHandler: handleError
	})
).pipe(
	gulpif(
		isDevEnv,
		sourcemaps.init()
	)
).pipe(
	sassGlob()
).pipe(
	sass({
		outputStyle: isDevEnv ? 'compact' : 'compressed'
	}).on('error', handleError)
).pipe(
	autoprefixer('last 3 versions')
).pipe(
	gulpif(
		isDevEnv,
		sourcemaps.write()
	)
).pipe(
	gulp.dest(
		handleNodeEnvPath(
			/**
			 * @ Dev path
			 */
			handlePath(paths.dev, paths.css),

			/**
			 * @ Prod path
			 */
			handlePath(paths.build, paths.css)
		)
	)
);

/**
 * @ Handle Images Optimization
 */
const handleImagesOptimization = () => gulp.src([
	handlePath(paths.src, '/images/**/*')
]).pipe(
	gulpif(
		isDevEnv,
		imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			})
		]),
		imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [
					{ cleanupAttrs: true },
					{ removeDoctype: true },
					{ removeXMLProcInst: true },
					{ removeComments: true },
					{ removeMetadata: true },
					{ removeUselessDefs: true },
					{ removeEditorsNSData: true },
					{ removeEmptyAttrs: true },
					{ removeHiddenElems: false },
					{ removeEmptyText: true },
					{ removeEmptyContainers: true },
					{ cleanupEnableBackground: true },
					{ cleanupIDs: false },
					{ convertStyleToAttrs: true }
				]
			})
		])
	)
).pipe(
	gulp.dest(
		handleNodeEnvPath(
			/**
			 * @ Dev path
			 */
			handlePath(paths.dev, '/images'),

			/**
			 * @ Prod path
			 */
			handlePath(paths.build, '/images')
		)
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

	gulp.watch(
		handlePath(paths.src, '/images/**/*'),
		handleImagesOptimization
	);
};

/**
 * @ Register gulp build task
 */
gulp.task('build',
	gulp.series(
		handleClean,
		handleImagesOptimization,
		handleSass,
		handleHtml,
		handleScripts
	)
);

/**
 * @ Register gulp default task
 */
gulp.task('default', 
	gulp.series(
		handleClean,
		gulp.parallel(
			handleImagesOptimization,
			handleSass,
			handleHtml,
			handleScripts,
			handleWatch,
			handleReload
		)
	)
);
