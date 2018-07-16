/**
 * @ Browsersync configs
 */
module.exports = {
	host: 'localhost',
	port: 8080,
	open: 'external',
	files: [
		'../dev/**/*.css',
		'../dev/**/*.js',
		'../dev/**/*.html'
	],
	snippetOptions: {
		rule: {
			match: /<\/body>/i,
			fn: (snippet, match) => snippet + match
		}
	},
	server: {
		baseDir: '../dev',
		directory: true
	},
	reloadThrottle: 100
};
