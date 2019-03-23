/**
 * The external dependencies.
 */
import {
  src,
  dest,
  watch,
  task,
  series,
  parallel
} from 'gulp';
import gulpNotify from 'gulp-notify';
import gulpSass from 'gulp-sass';
import gulpSassGlob from 'gulp-sass-glob';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpPlumber from 'gulp-plumber';
import gulpImagemin from 'gulp-imagemin';
import gulpFileinclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import del from 'del';
import browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

/**
 * The internal dependencies.
 */
import {
  is_development,
  is_production
} from './env';
import browsersyncConfig from './browsersync';
import webpackConfig from './webpack.config';

/**
 * The supported folder paths
 *
 * @type {Object}
 */
const paths = {
  src: '../src',
  dev: '../dev',
  build: '../build',

  partials: '/partials',
  resources: '/resources',
  sass: '/sass',
  css: '/css',
  js: '/js',
  scripts: '/js/main.js'
};

/**
 * Handle folders path.
 *
 * @param  {String} The default path
 * @param  {String} The additional path
 * @return {String}
 */
const handlePath = (defaultPath, additionalPath) => `${defaultPath}/${additionalPath}`;

/**
 * Handle node environment paths.
 *
 * @param  {String} The development path
 * @param  {String} The product path
 * @return {String}
 */
const handleNodeEnvPath = (devPath, prodPath) => is_development ? devPath : prodPath;

/**
 * Handle gulp error.
 *
 * @param {Object} The error
 */
const handleError = function(err) {
  gulpNotify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>'
  })(err);

  this.emit('end');
};

/**
 * Handle browsersync page reload.
 *
 * @return {Function}
 */
const handleReload = () => browsersync(browsersyncConfig);

/**
 * Handle dev/build folder clean.
 *
 * @return {Function}
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
 * Handle javascript files through webpack.
 *
 * @return {Function}
 */
const handleScripts = () => src(
  handlePath(paths.src, paths.scripts)
).pipe(
  gulpPlumber({ errorHandler: handleError })
).pipe(
  webpackStream(webpackConfig, webpack)
).pipe(
  dest(
    handleNodeEnvPath(
      // Dev path.
      handlePath(paths.dev, paths.js),

      // Prod path.
      handlePath(paths.build, paths.js)
    )
  )
);

/**
 * Handle html files.
 *
 * @return {Function}
 */
const handleHtml = () => src([
  handlePath(paths.src, '**/*.html'),
  `!${handlePath(paths.src, `${paths.partials}/**`)}`
]).pipe(
  gulpPlumber({ errorHandler: handleError })
).pipe(
  gulpFileinclude({
    prefix: '@@',
    basepath: handlePath(paths.src, paths.partials)
  })
).pipe(
  dest(
    handleNodeEnvPath(
      // Dev path.
      paths.dev,

      // Prod path.
      paths.build
    )
  )
);

/**
 * Handle css files
 *
 * @return {Function}
 */
const handleSass = () => src([
  handlePath(paths.src, `${paths.sass}/**/*.scss`)
]).pipe(
  gulpPlumber({ errorHandler: handleError })
).pipe(
  gulpIf(
    is_development,
    gulpSourcemaps.init()
  )
).pipe(
  gulpSassGlob()
).pipe(
  gulpSass({
    outputStyle: is_development ? 'compact' : 'compressed'
  }).on('error', handleError)
).pipe(
  gulpAutoprefixer('last 3 versions')
).pipe(
  gulpIf(
    is_development,
    gulpSourcemaps.write()
  )
).pipe(
  dest(
    handleNodeEnvPath(
      // Dev path.
      handlePath(paths.dev, paths.css),

      // Prod path.
      handlePath(paths.build, paths.css)
    )
  )
);

/**
 * Handle Images Optimization
 *
 * @return {Function}
 */
const handleImagesOptimization = () => src([
  handleNodeEnvPath(
    // Dev path.
    handlePath(paths.dev, `${paths.resources}/images/**/*`),

    // Prod path
    handlePath(paths.build, `${paths.resources}/images/**/*`)
  )
]).pipe(
  gulpIf(
    is_production,
    gulpImagemin([
      gulpImagemin.gifsicle({
        interlaced: true
      }),
      gulpImagemin.jpegtran({
        progressive: true
      })
    ]),
    gulpImagemin([
      gulpImagemin.gifsicle({
        interlaced: true
      }),
      gulpImagemin.jpegtran({
        progressive: true
      }),
      gulpImagemin.optipng({
        optimizationLevel: 5
      }),
      gulpImagemin.svgo({
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
  dest(
    handleNodeEnvPath(
      // Dev path.
      handlePath(paths.dev, `${paths.resources}/images`),

      // Prod path
      handlePath(paths.build, `${paths.resources}/images`)
    )
  )
);

/**
 * Handle resources folder.
 *
 * @return {Function}
 */
const handleResources = () => src([
  handlePath(paths.src, `${paths.resources}/**`),
  `!${handlePath(paths.src, `${paths.resources}/images`)}`,
  `!${handlePath(paths.src, `${paths.resources}/images/**/*`)}`
])
.pipe(
  gulpPlumber({ errorHandler: handleError })
).pipe(
  dest(
    handleNodeEnvPath(
      // Dev path.
      handlePath(paths.dev, paths.resources),

      // Prod path
      handlePath(paths.build, paths.resources)
    )
  )
);

/**
 * Handle folders watch.
 *
 * @return {Void}
 */
const handleWatch = () => {
  watch(
    handlePath(paths.src, `${paths.js}/**/*.js`),
    handleScripts
  );

  watch(
    [
      handlePath(paths.src, '**/*.html'),
      `!${handlePath(paths.src, `${paths.partials}/**`)}`
    ],
    handleHtml
  );

  watch(
    handlePath(paths.src, `${paths.sass}/**/*.scss`),
    handleSass
  );

  watch(
    [
      handlePath(paths.src, `${paths.resources}/**/*`),
      `!${handlePath(paths.src, `${paths.resources}/images`)}`,
      `!${handlePath(paths.src, `${paths.resources}/images/**/*`)}`
    ],
    handleResources
  );

  watch(
    handlePath(paths.src, `${paths.resources}/images/**/*`),
    handleImagesOptimization
  )
};

/**
 * Register gulp build task.
 */
task('build',
  series(
    handleClean,
    handleResources,
    handleImagesOptimization,
    handleSass,
    handleHtml,
    handleScripts
  )
);

/**
 * Register gulp default task.
 */
task('default', 
  series(
    handleClean,
    parallel(
      handleResources,
      handleSass,
      handleHtml,
      handleScripts,
      handleWatch,
      handleReload
    )
  )
);
