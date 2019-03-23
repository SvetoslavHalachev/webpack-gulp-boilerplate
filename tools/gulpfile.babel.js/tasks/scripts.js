/**
 * The external dependencies.
 */
import {
  src,
  dest
} from 'gulp';
import gulpPlumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

/**
 * The internal dependencies.
 */
import webpackConfig from '../../webpack.config';
import handleError from './error';
import paths from '../utils/paths';
import {
  handlePath,
  handleNodeEnvPath
} from '../utils/path-handlers';

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

export default handleScripts;