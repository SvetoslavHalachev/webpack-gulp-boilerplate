/**
 * The external dependencies.
 */
import del from 'del';

/**
 * The internal dependencies.
 */
import { handlePath } from '../utils/path-handlers';
import paths from '../utils/paths';

/**
 * Handle dev/build folder clean.
 *
 * @return {Function}
 */
const handleClean = () => del(
  [
    handlePath(paths.dev),
    handlePath(paths.build)
  ],
  {
    force: true
  }
);

export default handleClean;