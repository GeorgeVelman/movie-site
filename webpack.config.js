const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },

  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3004,
    hot: true,
    open: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./src/index.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.(jpe?g|png|svg|webp|gif)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },

      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
};
