const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const htmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  mode: 'production',
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },


  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'img/',
            outputPath: 'img/',
            esModule: false
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssExtract.loader, // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function () { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')({
                  //   'overrideBrowserslist': ['> .1%', 'last 5 versions']
                })
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    new htmlWebpack({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtract({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      whitelist: () => ['owl', 'svg', 'fadeOut'],
      whitelistPatterns: () => [/^owl/],
      whitelistPatternsChildren: () => [/^owl/]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}