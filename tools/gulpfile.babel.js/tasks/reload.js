/**
 * The external dependencies.
 */
import browsersync from 'browser-sync';

/**
 * The internal dependencies.
 */
import browsersyncConfig from '../../browsersync';

/**
 * Handle browsersync page reload.
 *
 * @return {Function}
 */
const handleReload = () => browsersync(browsersyncConfig);

export default handleReload;