const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './index.ts',
  context: `${__dirname}/src`,
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /(node_modules|dist)/,
        include: /src\/(.+)\/(.+)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /(node_modules|dist)/,
        include: /src\/(.+)\/(.+)/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|dist)/,
        use: 'vue-loader',
      },
      {
        test: /\.(?!(vue|s?css|[tj]s)$)$/,
        exclude: /(node_modules|dist)/,
        include: /src\/(.+)\/(.+)/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
};

module.exports = config;
