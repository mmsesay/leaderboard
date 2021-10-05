import { path } from 'path';
import { HtmlWebpackPlugin } from 'html-webpack-plugin';

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
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};