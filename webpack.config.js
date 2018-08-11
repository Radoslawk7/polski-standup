const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/app.jsx', // tu zmieniamy ścieżkę dostępu
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'out.js'
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: { 
            presets: ['env', 'stage-2', 'react']
          }
        }
      },
      { 
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|woff|woff2|eot|ttf|gif|webp)/,
        use: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  devServer: {
    historyApiFallback: true
  }
};