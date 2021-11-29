const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/simple-crud-api.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ]
}