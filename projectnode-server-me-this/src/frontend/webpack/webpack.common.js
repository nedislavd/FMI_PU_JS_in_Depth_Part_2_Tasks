const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../index.html'),
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../views/menu.html'),
      filename: './views/menu.html'
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../views/orders.html'),
      filename: './views/orders.html'
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../views/tables.html'),
      filename: './views/tables.html'
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../') //TODO: test if accessing parent dir works
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
