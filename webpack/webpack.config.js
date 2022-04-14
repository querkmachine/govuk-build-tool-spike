const paths = require("../paths.json")
const path = require("path")
const copyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: [paths.src + "all.js", paths.src + "all.scss"],
  output: {
    filename: "all.js",
    path: path.resolve(__dirname, "output"),
  },
  plugins: [
    new copyPlugin({
      patterns: [
        { from: paths.src + "assets/*", to: "./output" }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ],
      },
    ],
  },
  loaders: [
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }
  ]
}