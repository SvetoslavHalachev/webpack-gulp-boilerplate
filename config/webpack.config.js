/**
 * @ External dependencies
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

/**
 * @ Internal dependencies
 */
const isProdEnv = require('./env');
const isDevEnv = require('./env');

/**
 * @ Define webpack configs
 */
module.exports = {
	mode: process.env.NODE_ENV || 'development',

	entry: {
		app: '../src/js/main.js'
	},

	devtool: isDevEnv ? 'source-map' : false,

	watch: isDevEnv,

	output: {
		filename: 'js/[name].bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [
						['env', {
							targets: {
								browsers: ['last 3 versions']
							}
						}]
					]
				}
			}
		]
	},

	plugins: isProdEnv ? [
		new UglifyJsPlugin()
	]:[]
};
