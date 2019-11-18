module.exports = {
  showDevEntry: false,
  css: {
    requireModuleExtension: true,
    extract: false
  },
  chainWebpack(webpackChainConfig) {
    if (process.env.NODE_ENV === 'production') {
      webpackChainConfig
        .entry('app')
        .clear()
        .add('./src/plugin/index')
        .end()

      webpackChainConfig.output
        .library('ReactLiveBox')
        .libraryTarget('umd')
        .filename('docsify-react-live.min.js')
      

      webpackChainConfig.externals({
        react: 'React',
        'react-dom': 'ReactDOM'
      })

      webpackChainConfig.plugins
        .delete('HtmlWebpackPlugin')
        .delete('ScriptExtHtmlWebpackPlugin')

      webpackChainConfig.optimization.delete('splitChunks')
    }
  }
}
