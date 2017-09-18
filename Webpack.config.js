var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

let CommonConfig = {
  entry: './src/index.js',
  externals: {
    vue: 'vue'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
}

let InlineCssConfig = Object.assign({}, CommonConfig, {
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-easy-alert',
    library: ['vue-easy-alert'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
})


let ExtractCssConfig = Object.assign({}, CommonConfig, {
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-easy-alert-lite',
    library: ['vue-easy-alert'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("vue-easy-alert.css")
  ]
})

module.exports = [ InlineCssConfig, ExtractCssConfig ]

if (process.env.NODE_ENV === 'production') {

  module.exports.forEach(function(config) {
    config.devtool = '#source-map'
    config.output.filename = `${config.output.filename}.min.js`,
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   compress: {
      //     warnings: false
      //   }
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }, this);

}