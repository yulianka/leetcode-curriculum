const path = require("node:path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "fetch-leetcode-problem-list.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
        exclude: /\bnode_modules\b/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", "..."],
  },

  externalsType: "commonjs",
  externals: {
    "node:crypto": "node:crypto",
    "node:fs": "node:fs",
    "node:fs/promises": "node:fs/promises",
    "node:process": "node:process",
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: "#!node\n",
      raw: true,
      entryOnly: true,
    }),
  ],
};
