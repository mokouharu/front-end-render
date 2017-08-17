// 使用 NodeJS 自带的文件路径插件
var path = require('path')
// 引入一些小工具
var utils = require('./utils')
// 引入 config/index.js
var config = require('../config')
// 使用loader配置
var vueLoaderConfig = require('./vue-loader.conf')

// 绝对路径
function resolve (dir) {
  console.log('dirname:', __dirname);
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['src/main.js']
  },
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: '[name].js',
    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      path.join(__dirname, '../..', 'node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
