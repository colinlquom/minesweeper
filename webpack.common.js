import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/main.js",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
