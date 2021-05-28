import React, { useEffect, useRef, useContext } from 'react'
import LiveContext from './LiveContext'

let globalComponentCounter = 0

function LivePreview({ isMobile }) {
  const iframeRef = useRef()
  const liveContext = useContext(LiveContext)
  const BabelRenderElement = liveContext.element
  useEffect(() => {
    if (isMobile) {
      // save for global
      const componentCacheKey = getGlobalKey()
      window[componentCacheKey] = BabelRenderElement

      const iframe = iframeRef.current
      const childDocument = iframe.contentWindow.document
      inheritStyle(childDocument)
      // append Component
      const div = document.createElement('div')
      div.id = 'iframe-component'
      const script = childDocument.createElement('script')
      script.appendChild(document.createTextNode(`
        var React = top.React;
        var ReactDOM = top.ReactDOM;
        ReactDOM.render(React.createElement(top['${componentCacheKey}']), document.getElementById('iframe-component'))
      `))
      script.type = 'text/javascript'
      childDocument.body.append(div)
      childDocument.body.appendChild(script)
    }
  }, [])
  return (
    <>
      {
        isMobile ? (
          <iframe
            className="mobile-render-iframe"
            ref={iframeRef}
          >
            text
          </iframe>
        ) : <BabelRenderElement />
      }
    </>
  )
}

function getGlobalKey() {
  const currentCounter = globalComponentCounter
  globalComponentCounter += 1
  return `__iframeComponent_${currentCounter}`
}

function inheritStyle(childDocument) {
  // apply link style
  document.querySelectorAll('link[rel=stylesheet]').forEach((link) => {
    const newLink = document.createElement('link')
    newLink.rel = link.rel
    newLink.href = link.href
    childDocument.head.appendChild(newLink)
  })
  // apply text/css
  document.querySelectorAll('style[type="text/css"]').forEach((link) => {
    const newLink = document.createElement('style')
    newLink.appendChild(document.createTextNode(link.innerText))
    childDocument.head.appendChild(newLink)
  })
}

LivePreview.defaultProps = {
  Component: 'div'
}

export default LivePreview
