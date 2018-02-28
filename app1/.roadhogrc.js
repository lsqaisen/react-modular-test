import glob from 'glob';
import path from 'path';

// 获取指定路径下的入口文件
function getEntries(globPath, pathName) {
	let files = glob.sync(globPath),
		entries = [];

	files.forEach(function (filepath) {
		// 取倒数第二层(view下面的文件夹)做包名
		let split = filepath.split('/');
		let name = split[split.length - 2];
		// entries.push(filepath)
		entries[`${name.toLocaleLowerCase()}/${!pathName ? name.toLocaleLowerCase() : pathName}`] = './' + filepath;
	});

	return entries;
}

let entries1 = getEntries('src/routes/*/index.js', 'index');
let entries2 = getEntries('src/routes/*/entry.js');
export default {
	entry: {
		index: './src/index.js',
		...entries1,
		...entries2
	},
	outputPath: path.join(__dirname, './dist/'),
	publicPath: './',
	hash: true,
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
	}
}
