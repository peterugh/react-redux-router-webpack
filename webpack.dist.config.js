var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // build css files
var CopyWebpackPlugin = require('copy-webpack-plugin'); // copy images over
var ReplacePlugin = require('replace-webpack-plugin'); // replace CDN paths

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './app/index.js'
  ],
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash].js' // versions file
  },
  module: {
    loaders: [
      { 
        // makes class names available in the JS and add random chars on end
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]'), 
        exclude: /node_modules/
      },
      {
        // compiles sass to css
        test: /\.scss$/,
        loaders: ['sass']
      },
      {
        //plain css loader
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]'), 
        exclude: /node_modules/
      },          
      {
        // fonts
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        // transpiler
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      { 
        // strips console messages
        test: /\.js$/,
        loader: "webpack-strip?strip[]=console.log,strip[]=console.warn,strip[]=console.info"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/main.[hash].css"),
    new ReplacePlugin({
      // adds hashed files into index.html
      skip: process.env.NODE_ENV === 'development',
      hash: '[hash]',
      entry: './app/index.html',
      output: './dist/index.html',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="/css/main.[hash].css">',
        js: '<script src="/app.[hash].js"></script>'
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/images', to: 'images' }, // moves images to dist folder
      { from: './app/fonts', to: 'fonts' } // moves fonts to dist folder
    ])
  ]
};