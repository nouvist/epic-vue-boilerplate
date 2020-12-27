const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

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
        exclude: [`${__dirname}/node_modules`, `${__dirname}/dist`],
        include: [`${__dirname}/src`],
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
        include: [`${__dirname}/src`],
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/,
        exclude: [`${__dirname}/node_modules`, `${__dirname}/dist`],
        use: 'vue-loader',
      },
      {
        test: /\.(?!(vue|s?css|[tj]s)$)$/,
        exclude: [`${__dirname}/node_modules`, `${__dirname}/dist`],
        include: [`${__dirname}/src`],
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html', title: 'My Epic App' }),
  ],
};

module.exports = config;
