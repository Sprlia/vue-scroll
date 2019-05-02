var path = require('path')
var CompressionPlugin = require("compression-webpack-plugin");
var merge = require('webpack-merge');
var baseWebpackConfig = require('./base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'vueScroll.min.js'
  },
  entry: {
    'build': ['./src/index.js']
  },
  externals: {
    Vue: 'Vue'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../dist/*/*/*'],
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