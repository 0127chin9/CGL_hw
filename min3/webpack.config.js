var path = require('path');
var webpack = require('webpack');

module.exports = {
     entry: './js/main-3.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     
     module: {
         rules: [  // webpack2 use 'rules' instead of 'loaders'
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 use: {
                 	loader: 'babel-loader',
                 	options: {
                 		presets: ['@babel/preset-env']
                 	}
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
 
