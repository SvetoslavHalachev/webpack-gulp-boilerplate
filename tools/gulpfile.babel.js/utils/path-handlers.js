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
export const handlePath = (defaultPath, additionalPath) => `${defaultPath}/${additionalPath}`;

/**
 * Handle node environment paths.
 *
 * @param  {String} The development path
 * @param  {String} The product path
 * @return {String}
 */
export const handleNodeEnvPath = (devPath, prodPath) => is_development ? devPath : prodPath;