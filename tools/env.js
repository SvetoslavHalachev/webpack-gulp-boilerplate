/**
 * The environment variables.
 *
 * @type {String}
 */
const env            = process.env.NODE_ENV || 'development';
const is_development = env === 'development';
const is_production  = env === 'production';

module.exports = {
  is_development,
  is_production
};
