const extract = require("extract-text-webpack-plugin")
const css = new extract("./public/bundle.css")

module.exports = {
  entry: "./source/index.jsx",
  output: {
    filename: "./public/bundle.js"
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
          presets: ["react", "es2015", "minify"]
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
