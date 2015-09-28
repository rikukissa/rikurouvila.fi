var path = require('path');
var webpack = require('webpack');

var styleLoaders = [
  'style-loader',
  'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
  'autoprefixer-loader'
];

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    modulesDirectories: ['./src', './node_modules']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loaders: styleLoaders.concat(['less-loader'])
    }, {
      test: /\.styl$/,
      loaders: styleLoaders.concat(['stylus?paths=node_modules&include css=true'])
    }, {
      test: /\.(otf|eot|svg|ttf|woff|woff2)/,
      loader: 'url-loader?limit=100000'
    }]
  }
};
