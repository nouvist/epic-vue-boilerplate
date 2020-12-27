const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');
const { GenerateSW } = require('workbox-webpack-plugin');
const base = require('./webpack.dev');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  ...base,
  mode: 'production',
  plugins: [
    ...base.plugins,
    new WebpackObfuscatorPlugin(),
    new CopyWebpackPlugin({
      patterns: ['../static'],
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
      navigateFallback: `${base.output.publicPath}index.html`,
    }),
  ],
};

module.exports = config;
