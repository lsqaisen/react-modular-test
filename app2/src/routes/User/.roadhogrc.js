import glob from 'glob';
import path from 'path';

export default {
	"entry": { 'index': './src/index.js', ...entries },
	outputPath: path.join(__dirname, './dist'),
	env: {
		development: {
			extraBabelPlugins: [
				"dva-hmr",
				"transform-runtime"
			]
		},
		production: {
			extraBabelPlugins: [
				"transform-runtime"
			]
		}
	},
	html: {
		template: "./src/index.html"
	},
	// html: {
	// 	template: "./src/index.ej",
	// 	chunks: ['user/index'],
	// },
}
