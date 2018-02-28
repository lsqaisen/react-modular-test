// const path = require('path');
// const glob = require('glob');
import webpack from 'webpack';
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';

// // 获取指定路径下的入口文件
// function getEntries(globPath) {
//     let files = glob.sync(globPath),
//         entries = [];

//     files.forEach(function (filepath) {
//         // 取倒数第二层(view下面的文件夹)做包名
//         let split = filepath.split('/');
//         let name = split[split.length - 2];
//         // entries.push(filepath)
//         entries[`${name.toLocaleLowerCase()}/${name.toLocaleLowerCase()}`] = './' + filepath;
//     });

//     return entries;
// }

// var entries = getEntries('src/routes/*/entry.js');
var buildTime = new Date();

export default {
    //入口文件，这里循环所有入口文件，不需要每个都写出来
    // entry: {
    //     'ekos': ['./src/index.js'],
    //     ...entries,
    // },
    // output: {
    //     path: path.join(__dirname, './dist'),
    //     filename: '[name].js',
    // },
    // resolve: {
    //     extensions: ['.js', '.jsx', '.css'],
    // },
    // module: {
    //     loaders: [ //定义一系列加载器
    //         {
    //             test: /\.html$/,
    //             loader: "html-loader"
    //         }, /*html*/ {
    //             test: /\.(js|jsx)$/,
    //             exclude: /node_modules/,
    //             loader: 'babel-loader'
    //         }, {
    //             test: /\.(jpg|png)$/,
    //             loader: "url?limit=10"
    //         }, //limit=10表示图片大小单位是k  小于这个值走内联大于这个值走外联             /*images 打包*/
    //         {
    //             test: /\.(less|css)$/,
    //             loader: ExtractTextPlugin.extract({
    //                 fallback: 'style-loader',
    //                 use: 'css-loader!less-loader'
    //             })
    //         }
    //     ]
    // },
    plugins: [
        new webpack.DefinePlugin({
            // "process.env": {
            //     NODE_ENV: JSON.stringify("production")
            // }
            ___VERSION___: JSON.stringify([
                (buildTime.getMonth() + 1) < 10 ? "0" + (buildTime.getMonth() + 1) : buildTime.getMonth() + 1,
                buildTime.getDate() < 10 ? "0" + buildTime.getDate() : buildTime.getDate(),
            ].join("") + "." + [
                buildTime.getHours() < 10 ? "0" + buildTime.getHours() : buildTime.getHours(),
                buildTime.getMinutes() < 10 ? "0" + buildTime.getMinutes() : buildTime.getMinutes(),
            ].join(""))
        }),
        // 类库统一打包生成一个文件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'common.js',
        //     minChunks: 2, // 提取使用2次以上的模块，打包到vendor里
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     }
        // }),
        new HtmlWebpackPlugin({
            filename: './dist/index.html', //打包后的html存放路径，也是从distPath开始
            template: './src/index.ejs', //文件模板，就是打包前的html文件
            inject: true, //可以对head和body做修改
            //设置该页面引用的文件，只有符合条件的才会被引用
            minify: { //压缩HTML
                removeComments: true,
                collapseWhitespace: false
            },
            hash: true, //版本号，打出来的html中对css和js的引用自带版本号
        }),
        // new ExtractTextPlugin("[name].css"),
    ],
};