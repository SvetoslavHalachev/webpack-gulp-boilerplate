/**
 * The external dependencies.
 */
import gulpNotify from 'gulp-notify';

/**
 * Handle gulp error.
 *
 * @param {Object} The error
 */
const handleError = function(err) {
  gulpNotify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>'
  })(err);

  this.emit('end');
};

export default handleError;