const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your application
  output: {
    filename: "app.js", // Name of the output bundle
    path: path.resolve(__dirname, "public/dist"), // Output directory
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.js?$/, // Apply Babel transpilation to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      // added for css loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Add other rules here (e.g., for CSS or images)
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve files from the dist directory
      serveIndex: false,
    },
    port: 9000,
    historyApiFallback: true,
  },
};
