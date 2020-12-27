const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');
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
  ],
};

module.exports = config;
