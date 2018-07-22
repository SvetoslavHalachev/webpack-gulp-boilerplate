/**
 * @ External dependencies
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack        = require('webpack');

/**
 * @ Internal dependencies
 */
const { env, isDevEnv } = require('./node-env');

/**
 * @ The supported plugins
 */
const plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
	})
];

/**
 * @ Add production plugins
 */
if ( !isDevEnv ) {
	plugins.push(
		new UglifyJsPlugin()
	);
}

/**
 * @ Define webpack configs
 */
module.exports = {
	mode: env ? 'development' : 'production',

	entry: {
		app: [
			'babel-polyfill',
			'../src/js/main.js'
		]
	},

	devtool: isDevEnv ? 'source-map' : false,

	output: {
		filename: 'js/[name].bundle.js'
	},

	watch: isDevEnv,

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

	plugins: plugins
};
