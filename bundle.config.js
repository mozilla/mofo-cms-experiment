var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'main.jsx'),
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ]
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  plugins: []
};


