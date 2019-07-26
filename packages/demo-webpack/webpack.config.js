const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FardWebpackPlugin = require('fard-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'wechat';

const SRC_DIR = path.resolve('src');

const CSS_FILE_EXT = {
  wechat: 'wxss',
  baidu: 'css',
  alipay: 'acss',
  toutiao: 'ttss',
};

const buildEntryFromPages = pages => {
  const result = {};
  for (const page of pages) {
    result[page] = path.resolve(__dirname, SRC_DIR, `${page}.tsx`);
  }
  return result;
};

module.exports = {
  mode: nodeEnv,
  context: SRC_DIR,
  entry: buildEntryFromPages(require(path.resolve(SRC_DIR, 'app.json')).pages),
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${CSS_FILE_EXT[target] || 'wxss'}`,
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_DIR, 'app.json'),
        to: 'app.json',
      },
      {
        from: path.resolve(SRC_DIR, 'app.js'),
        to: 'app.js',
      },
    ]),

    new FardWebpackPlugin({
      bridgeType: 'template',
      target,
      maxDepth: 10,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: nodeEnv === 'production',
    }),
  ],
  mode: 'production',
};
