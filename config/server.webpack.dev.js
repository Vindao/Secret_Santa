const Paths = require("./Paths");

const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
module.exports = {
  entry: Paths.server,
  output: {
    filename: "server.bundle.js",
    path: Paths.dist
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
          configFile: Paths.tsconfigServer
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  mode: "development",
  target: "node",
  plugins: [new NodemonPlugin()]
};
