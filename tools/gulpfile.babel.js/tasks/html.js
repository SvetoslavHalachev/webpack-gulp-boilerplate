/**
 * The external dependencies.
 */
import {
  src,
  dest
} from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpFileinclude from 'gulp-file-include';

/**
 * The internal dependencies.
 */
import handleError from './error';
import paths from '../utils/paths';
import {
  handlePath,
  handleNodeEnvPath
} from '../utils/path-handlers';

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
      handlePath(paths.dev),

      // Prod path.
      handlePath(paths.build)
    )
  )
);

export default handleHtml;