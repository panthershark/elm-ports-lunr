const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');

const path_parts = __dirname.split(path.sep);
const page_name = path_parts[path_parts.length - 1];
const entry = [ require.resolve('./index.js') ];
const output = {
  path: path.resolve(path.join('tmp', page_name)),
  filename: `./index.js`,
  publicPath: `/${page_name}/`
  // publicPath: ''
};

const sass_loader = {
  test: /\.(scss)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: function() {
          return [
            cssnano({
              autoprefixer: {
                add: true,
                remove: true,
                browsers: [ 'last 2 versions' ]
              },
              discardComments: {
                removeAll: true
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true,
              sourcemap: true
            })
          ];
        }
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [ path.resolve('./src/styles'), path.resolve('./node_modules') ]
      }
    }
  ]
};

// common webpack config
const webpack_config = {
  entry,
  output,

  resolve: {
    extensions: [ '.js', '.elm' ]
  },

  module: {
    noParse: /\.elm$/,
    rules: [
      {
        test: /\.elm$/,
        exclude: [ /elm-stuff/, /node_modules/ ],
        use: [
          {
            loader: 'elm-webpack-loader',
            options: {
              debug: true,
              forceWatch: true
            }
          }
        ]
      },
      sass_loader
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(path.join('examples', page_name, 'index.html')),
      inject: 'body',
      filename: path.resolve(path.join('tmp', page_name, 'index.html')),
      minify: {
        collapseWhitespace: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].css',
      disable: false,
      allChunks: true
    })
  ]
};

module.exports = webpack_config;
