'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nib from 'nib';


module.exports = {

  devtool: 'eval-source-map',

  entry: [
    'eventsource-polyfill',
    'babel-polyfill', // adds support for ES6 APIs, e.g. Object.assign, and Promises
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/Index.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/build/'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"staging"',
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
    modulesDirectories: ['.', 'node_modules'],
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader',
    //   },
    // ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
        loader: 'file-loader',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
    ],
  },

  stylus: {
    use: [
      nib()
    ],
  },

};
