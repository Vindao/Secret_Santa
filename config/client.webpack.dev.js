const Paths = require("./Paths");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: Paths.client,
  output: {
    path: Paths.clientDist,
    filename: "client.bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
          configFile: Paths.tsconfigClient
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: Paths.HTMLTemplate,
      inject: true
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      open: false,
      port: 3000,
      server: { baseDir: ["dist/client/"] }
    })
  ],

  mode: "development"
};
