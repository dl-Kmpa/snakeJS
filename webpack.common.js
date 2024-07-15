const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: './js/[name].[contenthash].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
        filename: './index.html',
        template: './src/template.html',
        title: 'myApplication',
        hash: true
    })
  ],
  module: {
    rules: [
      {
        test:/\.(js|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(css)/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
}