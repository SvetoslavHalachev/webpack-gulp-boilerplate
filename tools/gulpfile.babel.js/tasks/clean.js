/**
 * The external dependencies.
 */
import del from 'del';

/**
 * The internal dependencies.
 */
import paths from '../utils/paths';

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

export default handleClean;