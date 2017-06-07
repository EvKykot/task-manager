'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    'bundle.generator-mvp': [
      'webpack-hot-middleware/client?reload=true',
      './src/client/boot/task-manager.entry.js'
    ]
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, './build/client'),
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js'
  },
  resolve: {
    modules: ["src", "node_modules"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              sourceMaps: 'inline',
              presets: [
                ['react'],
                ['es2015', {modules: false}]
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 4000
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: { parser: 'postcss-scss' }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'fonts/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { name: 'templates/[name].[ext]' }
          }
        ]
      }
    ]
  }
};
