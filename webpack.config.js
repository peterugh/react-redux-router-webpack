var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    progress: true,
    hot: true,
    stats: 'errors-only'
  },
  entry: [
    'whatwg-fetch',
    'webpack/hot/dev-server',
    './app/index.js'
  ],
  output: { 
    path: path.resolve(__dirname, 'dev'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { 
        // makes class names available in the JS and add random chars on end
        test: /\.scss$/, 
        loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]',
        exclude: /node_modules/
      },
      {
        // compiles sass to css
        test: /\.scss$/,
        loaders: ['sass'],
        exclude: /node_modules/
      },          
      {
        // loads fonts
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      { 
        // extracts plain css files
        // good if you have a plugin that requires plain classes
        test: /\.css$/, 
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]'], 
        exclude: /node_modules/
      },
      {
        // react hot reloader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot',
        include: __dirname,
      },
      {
        // transpiler
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
        query: {
          presets: [ 'es2015', 'react', 'stage-0' ]
        },
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({  // passes development into environment for use by some packages
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(), // hot reload
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' }, // moves index.html into dev folder
      { from: './app/images', to: 'images' }, // moves images to dev folder
      { from: './app/fonts', to: 'fonts' } // moves fonts t dev folder
    ])
  ]
};