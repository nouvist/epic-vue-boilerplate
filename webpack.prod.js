const WebpackObfuscatorPlugin = require('webpack-obfuscator');
const base = require('./webpack.dev');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  ...base,
  mode: 'production',
  plugins: [...base.plugins, new WebpackObfuscatorPlugin()],
};

module.exports = config;
