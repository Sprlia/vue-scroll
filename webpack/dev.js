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
  entry: {
    'build': ['./example/main.js']
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/index.html',
      inject: 'true',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
})

module.exports = webpackConfig