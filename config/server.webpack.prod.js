const Paths = require("./Paths");

module.exports = {
  entry: Paths.server,
  output: {
    filename: "server.bundle.js",
    path: Paths.dist,
    publicPath: Paths.dist,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, exclude: [/node_modules/], loader: "ts-loader", options: {
      configFile: Paths.tsconfigServer
    } },],
  },
  mode: "production",
  target: "node",
};
