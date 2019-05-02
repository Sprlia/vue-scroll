var webpack = require('webpack')
var merge = require('webpack-merge');
var baseWebpackConfig = require('./base');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'build': ['./src/main.vue']
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerHost: 'localhost',
    })
],
})

module.exports = webpackConfig