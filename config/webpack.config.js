/**
 * @ External dependencies.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',

	devtool: 'source-map',
	
	entry: {
		app: '../src/js/main.js'
	},

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
							'targets': {
								'browsers': ['last 3 versions']
							}
						}]
					]
				}
			}
		]
	}
};