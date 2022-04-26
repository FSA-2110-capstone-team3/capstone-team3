const Dotenv = require("dotenv-webpack");
const webpack = require('webpack')
require("dotenv").config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GUEST_EMAIL': JSON.stringify(process.env.GUEST_EMAIL),
      'process.env.GUEST_PW': JSON.stringify(process.env.GUEST_PW),
    }),
  ],
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
}
