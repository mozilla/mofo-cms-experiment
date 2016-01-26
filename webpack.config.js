var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'dist/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ]
      }
    ]
  },
  plugins: []
};


