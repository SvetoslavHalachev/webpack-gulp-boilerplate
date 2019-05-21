/**
 * The internal dependencies.
 */
const paths = require('./gulpfile.babel.js/utils/paths').default;
const { handlePath } = require('./gulpfile.babel.js/utils/path-handlers');

/**
 * The browsersync configs.
 * 
 * @type {Object}
 */
module.exports = {
  host: 'localhost',
  port: 3000,
  open: 'external',
  files: [
    handlePath(paths.dev, '**/*.css'),
    handlePath(paths.dev, '**/*.js'),
    handlePath(paths.dev, '**/*.html')
  ],
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet, match) => snippet + match
    }
  },
  server: {
    baseDir: handlePath(paths.dev),
    directory: true
  },
  reloadThrottle: 100
};
