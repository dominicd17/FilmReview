const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env",  "@babel/preset-react"]
          }
        }
      },
      {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
          ],
      }]
  }
  
}