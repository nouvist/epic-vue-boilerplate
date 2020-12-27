const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');
const { GenerateSW } = require('workbox-webpack-plugin');

/**
 *
 * @param {string[]} env
 * @param {import('webpack').Configuration} options
 */
module.exports = (env, options) => {
  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    entry: './index.ts',
    context: `${__dirname}/src`,
    output: {
      publicPath: '/',
      path: `${__dirname}/dist`,
      filename: '[name].js',
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
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': `${__dirname}/src`,
      },
    },
    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          exclude: [
            `${__dirname}/node_modules`,
            `${__dirname}/dist`,
            `${__dirname}/static`,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s?css$/,
          exclude: [
            `${__dirname}/node_modules`,
            `${__dirname}/dist`,
            `${__dirname}/static`,
          ],
          use: [
            ...(options.mode == 'production'
              ? [MiniCssExtractPlugin.loader]
              : ['style-loader']),
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
        // {
        //   test: /\.(?!vue|s?css|[tj]s$)(.+)$/,
        //   use: 'file-loader',
        // },
        {
          test: /\.vue$/,
          exclude: [
            `${__dirname}/node_modules`,
            `${__dirname}/dist`,
            `${__dirname}/static`,
          ],
          use: 'vue-loader',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: `${__dirname}/static/index.html`,
        title: 'My Epic App',
      }),
      ...(options.mode == 'production'
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
  };
  return config;
};
