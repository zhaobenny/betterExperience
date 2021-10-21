const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob')

module.exports = {
  entry: glob.sync('./src/typescript/**/*.ts').reduce(function (obj, el) {
    obj[path.parse(el).name] = el
    return obj
  }, {}),
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json', to: '[name][ext]' },
        { from: './src/css/*', to: '[name][ext]' },
        { from: './src/icons/*', to: '[name][ext]' },
        { from: './src/html/*', to: '[name][ext]' }
      ]
    })
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist'), clean: true }
}
