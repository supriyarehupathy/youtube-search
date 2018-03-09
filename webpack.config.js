const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: true,
});

const FeatureFlagsPluginConfig = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify("development")
  }
});

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'src'),
}

module.exports = {
  entry: ['babel-polyfill', path.join(paths.JS, 'index.js')],
  output: {
    path: paths.DIST,
    filename: "bundle.js",
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    FeatureFlagsPluginConfig,
  ],
  devServer: {
    historyApiFallback: true
  }
}