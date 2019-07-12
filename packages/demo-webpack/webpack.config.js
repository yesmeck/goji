const path = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FardWebpackPlugin = require('fard-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: nodeEnv,
  entry: {
    'pages/index/index': path.resolve(__dirname, 'pages/index/index.js'),
    'pages/benchmark/index': path.resolve(__dirname, 'pages/benchmark/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].wxss'
    }),

    new CopyWebpackPlugin([
      {
        from: './app.json',
        to: 'app.json'
      },
      {
        from: './app.js',
        to: 'app.js'
      }
    ]),

    new FardWebpackPlugin({
      bridgeType: 'template'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    })
  ],
  mode: 'production'
}
