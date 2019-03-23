/**
 * The external dependencies.
 */
import {
  src,
  dest
} from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpImagemin from 'gulp-imagemin';
import gulpIf from 'gulp-if';

/**
 * The internal dependencies.
 */
import handleError from './error';
import paths from '../utils/paths';
import { is_production } from '../../env';
import {
  handlePath,
  handleNodeEnvPath
} from '../utils/path-handlers';

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
  gulpPlumber({ errorHandler: handleError })
).pipe(
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

export default handleImagesOptimization;