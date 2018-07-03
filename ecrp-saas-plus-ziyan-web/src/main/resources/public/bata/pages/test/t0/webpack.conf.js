var utils = require('../../../../build/utils')
var webpack = require('webpack')
var config = require('../../../../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('../../../../build/webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['../../../../build/dev-client'].concat(baseWebpackConfig.entry[name])
})
baseWebpackConfig.entry = {}
baseWebpackConfig.plugins = []
module.exports = merge(baseWebpackConfig, {
  entry: {'test/t0': 'E:\\workspace\\GitHub\\Zoonavena\\webpack-many\\src\\pages\\test\\t0\\main.js'},
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*    new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          chunks: ['manifest', 'vendor', 'app'],
          inject: true
        }),*/
    new HtmlWebpackPlugin({
      filename: `test/t0/index.html`,
      template: `./page.js`,
      chunks: ['manifest', 'vendor', 'test/t0'],
      hash: true, // 为静态资源生成hash值
      xhtml: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
