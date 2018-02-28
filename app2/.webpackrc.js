import glob from 'glob';
import path from 'path';

// 获取指定路径下的入口文件
function getEntries(globPath) {
    let files = glob.sync(globPath),
        entries = [];

    files.forEach(function (filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        let split = filepath.split('/');
        let name = split[split.length - 2];
        // entries.push(filepath)
        entries[`${name.toLocaleLowerCase()}/${name.toLocaleLowerCase()}`] = './' + filepath;
    });

    return entries;
}

let entries = getEntries('src/routes/*/entry.js');
console.log(entries)
export default {
    entry: { 'index': './src/index.js', ...entries },
    outputPath: path.join(__dirname, './dist'),
    hash: true,
    commons: [
        {
            async: '__common',
            children: true,
            minChunks(module, count) {
                if (pageCount <= 2) {
                    return count >= pageCount;
                }
                return count >= pageCount * 0.5;
            },
        },
    ],
    html: {
        filename: path.join(__dirname, './dist/index.html'),
        template: "./src/index.ejs"
    },
}
