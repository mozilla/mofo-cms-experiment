var path = require('path');
var fs = require('fs');

// copied and modified from http://jlongster.com/Backend-Apps-with-Webpack--Part-I
// [Reason] Unfortunately the default behavior of externals is not what we want. 
// It assumes a browser environment, so require("foo") is turned into just foo, a global variable. 
// We want to keep the require. 
// This is possible by creating an object with a key/value of each module name, and prefixing the value with "commonjs".
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs2 ' + mod;
});

module.exports = {
  target: 'node',
  entry:'./app.js',
  output: {
    path: __dirname,
    filename: 'app.bundle.js',
    library: 'app.bundle',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.css$/, 
        loader: "file" 
      }
    ]
  },
  externals: nodeModules
};
