import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

// Main setup.
export default (env, {mode}) => {

  return {
    entry: {
      app:"./src/index.js"
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },

    devtool: "eval",

    module: {
      rules: [
        {
          test: /\.js?$/,
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    },

    resolve: {
      modules: [
        "shared", "node_modules"
      ],
      alias: {
        rhm: path.resolve(__dirname, "../dist/index")
      }
    },

    devServer: {
      hot: true,
      port: 8080,
      inline: true,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "dist")
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: "body",
        title: "RHM Example",
        filename: "index.html",
        template: path.resolve(__dirname, "src", "index.html")
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
