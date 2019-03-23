/**
 * The internal dependencies.
 */
const webpack = require('webpack');

/**
 * The external dependencies.
 */
const {
  is_production,
  is_development
} = require('./env');

/**
 * Define the webpack configs.
 * 
 * @type {Object}
 */
module.exports = {
  /**
   * The webpack mode.
   * 
   * @type {String}
   */
  mode: is_production ? 'production' : 'development',

  /**
   * The output file.
   */
  output: {
    filename: 'bundle.js'
  },

  /**
   * Setup devtool option only for development mode.
   * 
   * @type {String/Boolean}
   */
  devtool: is_development ? 'source-map' : false,

  /**
   * Setup watch option only for development mode.
   * 
   * @type {Boolean}
   */
  watch: is_development,

  /**
   * Setup the plugins.
   * 
   * @type {Array}
   */
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  /**
   * Setup the module/rules.
   * 
   * @type {Object}
   */
  module: {
    rules: [
      // the 'transform-runtime' plugin tells Babel to
      // require the runtime instead of inlining it.
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: is_development,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 3 versions']
                  }
                }
              ]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
