var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // build css files
var CopyWebpackPlugin = require('copy-webpack-plugin'); // copy images over
var ReplacePlugin = require('replace-webpack-plugin'); // replace CDN paths

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.js'
  ],
  output: { 
    path: path.resolve(__dirname, 'qa'),
    filename: 'app.[hash].js',
  },
  module: {
    loaders: [
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]'), 
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['sass']
      },          
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]'), 
        exclude: /node_modules/
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/main.[hash].css"),
    new ReplacePlugin({
      skip: process.env.NODE_ENV === 'development',
      hash: '[hash]',
      entry: './app/index.html',
      output: '/qa/index.html',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="css/main.[hash].css">',
        js: '<script src="app.[hash].js"></script>'
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SOCKET_PATH': JSON.stringify('https://sei-stage.herokuapp.com')
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/images', to: 'images' },
      { from: './app/fonts', to: 'fonts' }
    ])
  ]
};