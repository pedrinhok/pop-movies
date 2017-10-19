const extract = require("extract-text-webpack-plugin")
const css = new extract("./public/app.css")

module.exports = {
  entry: "./source/index.jsx",
  output: {
    filename: "./public/app.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: css.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
      }
    ]
  },
  plugins: [css]
}
