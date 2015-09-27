var webpack = require('webpack');
var assign = require('lodash.assign');
var config = require('./webpack.config.prod');

module.exports = assign(config, {
  devtool: 'eval',
  entry: ['webpack-hot-middleware/client'].concat(config.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
