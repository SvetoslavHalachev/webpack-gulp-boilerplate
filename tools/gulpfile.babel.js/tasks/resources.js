/**
 * The external dependencies.
 */
import {
  src,
  dest
} from 'gulp';
import gulpPlumber from 'gulp-plumber';

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

export default handleResources;