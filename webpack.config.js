const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  devServer: {
    static: './dist',
    port: 8000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'bundel.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/',
          emitFile: true,
          // esModule: false,
        },
      },
    ],
  },
};

// {
//   loader: 'file-loader',
//   options: {
//     name: '[name].[ext]',
//     outputPath: 'dist/assets/',
//   },
// },