import codeBlockWrapper from '../hoc/codeBlockWrapper'
import ReactDOM from 'react-dom'

export const create = function(scope, theme) {
  return function(hook, vm) {
    let id = 0

    class Components {
      constructor() {
        this.componentCache = {}
      }

      cache(Component, id) {
        const href = window.location.href
        const componentObj = {
          id,
          Component
        }

        if (this.componentCache[href]) {
          this.componentCache[href].push(componentObj)
        } else {
          this.componentCache[href] = [componentObj]
        }
      }

      renderFromCache() {
        const href = window.location.href
        const componentObjs = this.componentCache[href]
        if (componentObjs) {
          componentObjs.forEach(componentObj => {
            ReactDOM.render(componentObj.Component(), document.getElementById(componentObj.id + ''))
          })
        }
      }
    }

    const components = new Components()

    function renderComponent(Component, id) {
      components.cache(Component, id)

      setTimeout(function () {
        ReactDOM.render(Component(), document.getElementById(id + ''))
      })
    }

    // for debug
    window.__components = components

    window.$docsify.markdown = {
      renderer: {
        code: function(code, lang) {
          if (lang === 'jsx' && /^\/\*\s*react(.+)*\s*\*\//.test(code)) {
            id++
            const params = code.match(/^\/\*\s*react(.+)*\s*\*\//)[1] || ''
            const live = params.split(' ').indexOf('live') > -1
            const Component = codeBlockWrapper(code, live, scope, theme)
            renderComponent(Component, id)
            return '<div id="' + id + '" class="demo-box demo-box-react"/></div/>'
          } else {
            return this.origin.code.apply(this, arguments)
          }
        }
      }
    }

    hook.mounted(function() {
      // Called after initial completion. Only trigger once, no arguments.
      vm.router.onchange(() => {
        components.renderFromCache()
      })
    })
  }
}
