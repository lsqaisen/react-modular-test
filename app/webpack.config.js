// const path = require('path');
import glob from 'glob';
import webpack from 'webpack';
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';

// 获取指定路径下的入口文件
function getEntries(globPath) {
    let files = glob.sync(globPath),
        entries = [];
    files.forEach(function (filepath) {
        let split = filepath.split('/');
        let name = split[split.length - 2];
        entries.push(`${name.toLocaleLowerCase()}`);
    });

    return entries;
}

var entries = getEntries('src/routes/*/entry.js');
var buildTime = new Date();

module.exports = (webpackConfig, env) => {
    entries.forEach(v => {
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: `./${v}.html`, //打包后的html存放路径，也是从distPath开始
                template: './src/index.ejs', //文件模板，就是打包前的html文件
                inject: true, //可以对head和body做修改
                //设置该页面引用的文件，只有符合条件的才会被引用
                chunks: v === 'index' ? ['common', 'index',] : ['common', `${v}/index`, `${v}/${v}`],
                minify: { //压缩HTML
                    removeComments: true,
                    collapseWhitespace: false
                },
                hash: true, //版本号，打出来的html中对css和js的引用自带版本号
            }),
        )
    })

    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `./index.html`, //打包后的html存放路径，也是从distPath开始
            template: './src/index.ejs', //文件模板，就是打包前的html文件
            inject: true, //可以对head和body做修改
            //设置该页面引用的文件，只有符合条件的才会被引用
            chunks: ['common', 'index', ...entries.map(v => `${v}/${v}`)],
            minify: { //压缩HTML
                removeComments: true,
                collapseWhitespace: false
            },
            hash: true, //版本号，打出来的html中对css和js的引用自带版本号
        }),
    )

    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2, // 提取使用2次以上的模块，打包到vendor里
        }),
    )

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            ___VERSION___: JSON.stringify([
                (buildTime.getMonth() + 1) < 10 ? "0" + (buildTime.getMonth() + 1) : buildTime.getMonth() + 1,
                buildTime.getDate() < 10 ? "0" + buildTime.getDate() : buildTime.getDate(),
            ].join("") + "." + [
                buildTime.getHours() < 10 ? "0" + buildTime.getHours() : buildTime.getHours(),
                buildTime.getMinutes() < 10 ? "0" + buildTime.getMinutes() : buildTime.getMinutes(),
            ].join(""))
        }),
    )

    return webpackConfig;
};