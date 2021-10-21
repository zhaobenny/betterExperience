const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ZipWebpackPlugin = require('zip-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ZipWebpackPlugin({
      filename: 'dist.zip'
    })
  ]
})
