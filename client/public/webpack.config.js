const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: "OnTask"
      }),
      new InjectManifest({
        swSrc: './service-worker.js',
        swDest: "service-worker.js"
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'On Task',
        short_name: 'OnTask',
        description: 'Project Manager',
        // background_color: '#f5f5f5',
        // theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        crossorigin: 'anonymous', // crossorigin can be null, anonymous or use-credentials
        icons: [
          {
            src: path.resolve('./logo192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};