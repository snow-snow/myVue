const path = require('path')
module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  entry: './src/index.ts',
  output:{
    path: path.resolve(__dirname, 'lib'),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
