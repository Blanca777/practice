const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic'
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import './src/_variable.scss';@import './src/_handle.scss';`
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  performance: {
    hints: false
  }
}
