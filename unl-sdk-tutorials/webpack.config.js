module.exports = {
  mode: "development",
  entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
  resolve: {
    fallback: { https: false },
  },
};
