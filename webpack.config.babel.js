import path from "path"
import webpack from "webpack"

export default() => ({

  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "rhm"
  },

  externals : {
    redux: "redux"
  },

  context: path.resolve(__dirname, "src"),

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [
      "utils", "node_modules"
    ]
  }
})
