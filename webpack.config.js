var path = require('path');
var assign = require('lodash.assign');
var fs = require('fs');
var webpack = require('webpack');
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

var entry = production ? ['./src/index'] : [
  'webpack-hot-middleware/client',
  './src/index'
];

var plugins = [
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
  }),
  new ExtractTextPlugin('css/styles.css'),
  new ReactToHtmlPlugin('index.html', 'bundle.js', {
    template: function(data) {
      return fs.readFileSync('./index.html').toString()
        .replace('<body>', '<body>' + data.html);
    }
  })
];

if(!production) {
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

var styleLoaders = [
  'style-loader',
  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
];

function styleExtractorLoader(test, loader) {
  if(production) {
    var loaders = styleLoaders.slice(1).concat(loader).join('!');
    return {
      test: test,
      loader: ExtractTextPlugin.extract('style-loader', loaders, {
        publicPath: '/css'
      })
    };
  }

  return {
    test: test,
    loaders: styleLoaders.concat(loader)
  };
}

module.exports = {
  devtool: production ? 'source-map' : 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    library: 'App',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['./src', './node_modules']
  },
  plugins: plugins,
  module: {
    loaders: [
      styleExtractorLoader(/\.less$/, 'less-loader'),
      styleExtractorLoader(/\.styl$/, 'stylus-loader'),
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
