const Paths = require("./Paths");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: { client: Paths.client, sw: Paths.SW },
  output: {
    path: Paths.clientDist,
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
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
  mode: "production",
  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: Paths.HTMLTemplate,
      inject: true,
      minify: true
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new AppManifestWebpackPlugin({
      logo: Paths.Logo,
      statsFilename: "iconstats.json",
      persistentCache: false,
      output: "./",
      config: {
        appName: "Vindao Webpack App",
        appDiscription:
          "This is a boilerplate for a Progressive-web-application, please change this text in the client.webpack.prod.js file within the app directory. You can find all possible configs at https://www.npmjs.com/package/app-manifest-webpack-plugin",
        developerName: "Vindao (Vincent Schmitt)"
      }
    }),
    new ImageminWebpWebpackPlugin({
      mozjpeg: {
        progressive: true,
        quality: 65
      },
      optipng: {
        enabled: true
      },
      pngquant: {
        quality: "65-90",
        speed: 4
      },
      gifsicle: {
        interlaced: false
      },
      webp: {
        quality: 75
      }
    })
  ]
};
