/**
 * The external dependencies.
 */
import { resolve as resolvePath } from 'path';
import slash from 'slash';

/**
 * The internal dependencies.
 */
import { is_development } from '../../env';

/**
 * Handle folders path.
 *
 * @param  {String} The default path
 * @param  {String} The additional path
 * @return {String}
 */
export const handlePath = (defaultPath, additionalPath) => {
  if (additionalPath) {
    return slash(resolvePath(__dirname, defaultPath, additionalPath));
  }

  return slash(resolvePath(__dirname, defaultPath));
};

/**
 * Handle node environment paths.
 *
 * @param  {String} The development path
 * @param  {String} The product path
 * @return {String}
 */
export const handleNodeEnvPath = (devPath, prodPath) => is_development ? devPath : prodPath;