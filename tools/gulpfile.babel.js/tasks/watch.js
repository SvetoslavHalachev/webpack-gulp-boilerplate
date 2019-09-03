/**
 * The external dependencies.
 */
import {
  watch
} from 'gulp';

/**
 * The internal dependencies.
 */
import handleScripts from './scripts';
import handleHtml from './html';
import handleCSS from './css';
import handleResources from './resources';
import paths from '../utils/paths';
import { handlePath } from '../utils/path-handlers';

/**
 * Handle folders watch.
 *
 * @return {Void}
 */
const handleWatch = () => {
  watch(
    handlePath(paths.src, `${paths.sass}/**/*.scss`),
    handleCSS
  );

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
    handlePath(paths.src, `${paths.resources}/**`),
    handleResources
  );
};

export default handleWatch;