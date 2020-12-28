module.exports = {
  showDevEntry: false,
  css: {
    requireModuleExtension: true,
    extract: false
  },
  inlineSVG: true,
  productionSourceMap: true,
  transpileDependencies: ['@babel/standalone'],
  chainWebpack(webpackChainConfig) {
    webpackChainConfig.externals({
      react: 'React',
      'react-dom': 'ReactDOM'
    })
    if (process.env.NODE_ENV === 'production') {
      webpackChainConfig.optimization
        .minimize(false)

      webpackChainConfig
        .entry('app')
        .clear()
        .add('./src/plugin/index.js')
        .end()

      webpackChainConfig.output
        .library('ReactLiveBox')
        .libraryTarget('umd')
        .filename('docsify-react-live.min.js')

      webpackChainConfig.plugins
        .delete('HtmlWebpackPlugin')
        .delete('ScriptExtHtmlWebpackPlugin')

      webpackChainConfig.optimization.delete('splitChunks')
    } else {
      webpackChainConfig
        .entry('app')
        .clear()
        .add('./src/index.jsx')
        .end()
    }
  }
}
