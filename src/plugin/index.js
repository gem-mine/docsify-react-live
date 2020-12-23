import ReactDOM from 'react-dom'
import codeBlockWrapper from '../hoc/codeBlockWrapper'

// eslint-disable-next-line import/prefer-default-export
export const createPlugin = function createPlugin(scope, theme) {
  return function DocisfyReactLive() {
    const idPrefix = 'demo-box-react-'
    let id = 0

    function renderComponent(Component, elId) {
      setTimeout(() => {
        ReactDOM.render(Component(), document.getElementById(`${elId}`))
      })
    }

    window.$docsify.markdown = window.$docsify.markdown || {}
    const markdownConfig = window.$docsify.markdown
    markdownConfig.render = markdownConfig.render || {}

    markdownConfig.render.code = function renderCode(code, lang, ...rest) {
      if ((lang === 'jsx' || lang === 'tsx')
            && /^\/\*\s*react(.+)*\s*\*\//.test(code)) {
        id += 1
        const params = code.match(/^\/\*\s*react(.+)*\s*\*\//)[1] || ''
        const live = params.split(' ').indexOf('live') > -1
        const pureRender = params.split(' ').indexOf('pureRender') > -1
        const codeShow = params.split(' ').indexOf('codeShow') > -1
        const Component = codeBlockWrapper(code, scope, theme, live, pureRender, lang, codeShow)
        const currentId = `${idPrefix}${id}`
        renderComponent(Component, currentId)
        return `<div id="${currentId}" class="demo-box demo-box-react"/></div/>`
      } else {
        return this.origin.code(code, lang, ...rest)
      }
    }
  }
}
