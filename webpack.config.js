const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');
const { GenerateSW } = require('workbox-webpack-plugin');

/**
 * @param {import('webpack').Configuration} options
 * @param {boolean} prod
 * @returns {import('webpack').Configuration}
 */
const config = (options, prod) => ({
  entry: './index.ts',
  context: `${__dirname}/src`,
  output: {
    publicPath: '/',
    path: `${__dirname}/dist`,
    filename: 'js/[hash].js',
  },
  mode: options.mode,
  devServer: {
    port: 8080,
    contentBase: `${__dirname}/static`,
    historyApiFallback: true,
    watchOptions: {
      ignored: [
        `${__dirname}/node_modules`,
        `${__dirname}/dist`,
        `${__dirname}/static`,
      ],
    },
  },
  ...(prod
    ? {}
    : {
        devtool: 'eval-source-map',
      }),
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/i,
        exclude: /(node_modules|dist|static)/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        exclude: /(node_modules|dist|static)/i,
        use: [
          ...(prod ? [MiniCssExtractPlugin.loader] : ['style-loader']),
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "@/index.scss";',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/i,
        exclude: /(node_modules|dist|static)/i,
        use: 'vue-loader',
      },
      {
        test: /\.(?!vue|s?css|[tj]s|html$)(.+$)/i,
        exclude: /(node_modules|dist|static)/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[ext]/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/static/index.html`,
      filename: 'index.html',
      title: 'My Epic App',
    }),
    ...(prod
      ? [
          new WebpackObfuscatorPlugin(),
          new copyWebpackPlugin({
            patterns: ['../static'],
          }),
          new GenerateSW({
            swDest: 'service-worker.js',
            navigateFallback: '/index.html',
          }),
        ]
      : []),
  ],
});

/**
 * @param {string[]} env
 * @param {import('webpack').Configuration} options
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, options) => config(options, options.mode == 'production');
