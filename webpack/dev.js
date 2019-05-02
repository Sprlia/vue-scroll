var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge');
var baseWebpackConfig = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
  devServer: {
    //contentBase: './dist',
    //publicPath: './static',
    host: 'localhost',
    port: 9000,
    open: true,
    hot: true,
    inline: true,
    hotOnly: true,
    overlay: true,
    stats: "errors-only",
    clientLogLevel: 'none',
    proxy: {
    }
  },
  devtool: 'inline-source-map',
  plugins: [
  ]
})

module.exports = webpackConfig