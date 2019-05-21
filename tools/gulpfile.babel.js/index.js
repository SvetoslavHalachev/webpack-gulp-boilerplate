/**
 * The external dependencies.
 */
import {
  task,
  series,
  parallel
} from 'gulp';

/**
 * The internal dependencies.
 */
import handleClean from './tasks/clean';
import handleWatch from './tasks/watch';
import handleReload from './tasks/reload';
import handleScripts from './tasks/scripts';
import handleHtml from './tasks/html';
import handleCSS from './tasks/css';
import handleResources from './tasks/resources';
import handleImagesOptimization from './tasks/images';

/**
 * Register gulp build task.
 */
task('build',
  series(
    handleClean,
    handleCSS,
    handleScripts,
    handleHtml,
    handleResources,
    handleImagesOptimization
  )
);

/**
 * Register gulp dev task.
 */
task('default',
  series(
    handleClean,
    parallel(
      handleCSS,
      handleScripts,
      handleHtml,
      handleResources,
      handleWatch,
      handleReload
    )
  )
);
