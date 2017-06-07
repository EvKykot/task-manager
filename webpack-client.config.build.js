'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

process.env.NODE_ENV= 'production';
process.env.BABEL_ENV = 'production';

module.exports = {
  devtool: 'cheap-source-map',
  stats: {
    children: false,
    colors: true
  },
  entry: {
    'bundle.generator-mvp': './src/client/boot/task-manager.entry.js'
  },
  output: {
    publicPath: '/',
    path: './build/client',
    filename: 'scripts/[name].[chunkhash].js',
    chunkFilename: 'scripts/[name].[chunkhash].js'
  },
  resolve: {
    modules: ["src", "node_modules"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compressor: { warnings: false },
      sourceMap: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('styles/[name].[chunkhash].css'),
    new AssetsPlugin({filename: 'webpack-assets.json', path: __dirname + '/build/server/views'})
    //new webpack.optimize.CommonsChunkPlugin({name: 'commons'})
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
              sourceMaps: true,
              plugins: ['transform-object-assign'],
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: false,
              mozjpeg: {progressive: true},
              gifsicle: {interlaced: false},
              optipng: {optimizationLevel: 7},
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
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
