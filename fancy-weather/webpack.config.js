const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    entry: './src/js/index.js',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'main.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./src/index.html`
      }),
      new MiniCssExtractPlugin({
      filename: 'style.css'
    })
    ],
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader'
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        ]
      }
    }

  return config;
}
