var path = require('path')
var CompressionPlugin = require("compression-webpack-plugin");
var merge = require('webpack-merge');
var baseWebpackConfig = require('./base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../dist/**/*', '!static-files*'],
      //root: path.resolve(__dirname, '../'),
      dangerouslyAllowCleanPatternsOutsideProject: true,
      verbose: true,
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