import ReactDOM from 'react-dom'
import codeBlockWrapper from '../hoc/codeBlockWrapper'


// eslint-disable-next-line import/prefer-default-export
export const create = function(scope, theme) {
  return function() {
    const idPrefix = 'demo-box-react-'
    let id = 0
    function renderComponent(Component, id) {

      setTimeout(function () {
        ReactDOM.render(Component(), document.getElementById(id + ''))
      })
    }

    window.$docsify.markdown = {
      renderer: {
        code: function(code, lang) {
          if (lang === 'jsx' && /^\/\*\s*react(.+)*\s*\*\//.test(code)) {
            id++
            const params = code.match(/^\/\*\s*react(.+)*\s*\*\//)[1] || ''
            const live = params.split(' ').indexOf('live') > -1
            const pureRender = params.split(' ').indexOf('pureRender') > -1
            const Component = codeBlockWrapper(code, scope, theme, live, pureRender)
            const currentId = `${idPrefix}${id}`
            renderComponent(Component, currentId)
            return '<div id="' + currentId + '" class="demo-box demo-box-react"/></div/>'
          } else {
            return this.origin.code.apply(this, arguments)
          }
        }
      }
    }
  }
}
