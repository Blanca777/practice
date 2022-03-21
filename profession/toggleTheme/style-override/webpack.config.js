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
