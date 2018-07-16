/**
 * @ Handle development node environment
 */
module.exports.isDevEnv = () => process.env.NODE_ENV === 'development';

/**
 * @ Handle production node environment
 */
module.exports.isProdEnv = () => process.env.NODE_ENV === 'production';
