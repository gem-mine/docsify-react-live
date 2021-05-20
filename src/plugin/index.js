import ReactDOM from 'react-dom'
import codeBlockWrapper from '../hoc/codeBlockWrapper'

let reactRenderedIds = []
const idPrefix = 'demo-box-react-'
let id = 0

function renderComponent(Component, elId) {
  reactRenderedIds.push(elId)
  setTimeout(() => {
    ReactDOM.render(Component(), document.getElementById(elId))
  })
}

window.$docsify.markdown = window.$docsify.markdown || {}
const markdownConfig = window.$docsify.markdown
markdownConfig.renderer = markdownConfig.renderer || {}
markdownConfig.renderer.code = function renderCode(code, lang, ...rest) {
  if ((lang === 'jsx' || lang === 'tsx')
        && /^\/\*\s*react(.+)*\s*\*\//.test(code)) {
    id += 1
    const params = code.match(/^\/\*\s*react(.+)*\s*\*\//)[1] || ''
    const live = params.split(' ').indexOf('live') > -1
    const pureRender = params.split(' ').indexOf('pureRender') > -1
    const codeShow = params.split(' ').indexOf('codeShow') > -1
    const isMobile = params.split(' ').indexOf('mobile') > -1
    const Component = codeBlockWrapper(code, undefined,
      undefined, live, pureRender, lang, codeShow, isMobile)
    const currentId = `${idPrefix}${id}`
    renderComponent(Component, currentId)
    return `<div id="${currentId}" class="demo-box demo-box-react"/></div/>`
  } else {
    return this.origin.code(code, lang, ...rest)
  }
}

function install(hook) {
  hook.beforeEach(() => {
    reactRenderedIds.forEach((mountedId) => {
      const mountedNode = document.getElementById(mountedId)
      if (mountedNode) {
        ReactDOM.unmountComponentAtNode(mountedNode)
      }
    })
    reactRenderedIds = []
  })
}

window.$docsify.plugins = [].concat(install, window.$docsify.plugins)
