var path = require('path')
var CompressionPlugin = require("compression-webpack-plugin");
var merge = require('webpack-merge');
var baseWebpackConfig = require('./base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'build': ['./src/index.js']
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../dist/**/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanStaleWebpackAssets: true,
      verbose: true,
      dry: true,
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$|\.css$|\.jpg$/,
      threshold: 10240,
      minRatio: 0.9
    })
  ],
  devtool: '#source-map',
})

module.exports = webpackConfig