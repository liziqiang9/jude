const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    filename: 'arttext.min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: [
        `jude v${pkg.version}`,
      ].join('\n'),
      entryOnly: true
    }),
  ],
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.ts'
    ],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /(?:node_modules)/,
      },
    ]
  },
};