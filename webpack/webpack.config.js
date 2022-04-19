const paths = require("../paths.json")
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: [paths.src + "all.js", paths.src + "all.scss"],
  output: {
    filename: "all.js",
    path: path.resolve(__dirname, "output"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/output/"
            }
          }, 
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          { 
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ["./output/assets/"],
              },
            },
          }
        ]
      },
      {
        test: /\.css$/i,
        loader: 'css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: "[name]-[hash].[ext]"
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "all.css"
    }),
    new CopyPlugin({
      patterns: [
        { from: paths.src + "assets/", to: "./assets/" }
      ],
    }),
  ],
}