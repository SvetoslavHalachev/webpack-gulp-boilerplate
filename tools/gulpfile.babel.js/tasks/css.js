/**
 * The external dependencies.
 */
import {
  src,
  dest
} from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import gulpSassGlob from 'gulp-sass-glob';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpIf from 'gulp-if';

/**
 * The internal dependencies.
 */
import handleError from './error';
import paths from '../utils/paths';
import { is_development } from '../../env';
import {
  handlePath,
  handleNodeEnvPath
} from '../utils/path-handlers';

/**
 * Handle css files
 *
 * @return {Function}
 */
const handleCSS = () => src([
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

export default handleCSS;