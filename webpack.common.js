const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
  coop_listings: './src/typescript/coop_listings.ts',
  background: './src/typescript/background.ts',
  popup: './src/typescript/popup.ts',
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json', to: '[name][ext]'},
        { from: './src/css/*', to: '[name][ext]'},
        { from: './src/icons/*', to: '[name][ext]'},
        { from: './src/html/*', to: '[name][ext]'},
      ],
    }),
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist'), clean: true },
};