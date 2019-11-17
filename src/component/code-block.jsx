import React, { useState, useEffect } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import theme from './palenight'
import { createStyle, removeStyle }from '../util/style'
import generateGuid from '../util/guid'

export default function CodeBlock({ 
  code,
  style,
  className = '',
  live,
  title,
  desc,
  scope
}) {
  const [guid] = useState(generateGuid())
  useEffect(() => {
    if (style) {
      createStyle(style, guid)
    }
    return () => {
      if (style) {
        removeStyle(guid)
      }
    }
  })
  const [codeShow, setCodeShow] = useState(true)

  if (live) {
    return (
      <div className={`code-box ${className}`}>
        <LiveProvider
          code={code.trim()}
          transformCode={code => code}
          scope={{React}}
          theme={theme}
        >
          <div className="code-box-demo">
            <LivePreview />
          </div>
          <div className="code-box-meta markdown">
            { title && <div className="code-box-title"><a>{title}</a></div>}
            <div dangerouslySetInnerHTML={ {__html: desc} } />
            <div className="code-expand-icon" onClick={() => {setCodeShow(!codeShow)}}>
              <img alt="expand code" src={require("@/assets/code-open.svg")} className={codeShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'} />
              <img alt="expand code" src={require("@/assets/code.svg")} className={codeShow ? 'code-expand-icon-hide' : 'code-expand-icon-show'} />
              显示代码
            </div>
          </div>
          {
            codeShow && <div style={{ backgroundColor: 'rgb(50, 42, 56)' }} className="EditorWrapper">
              <LiveEditor />
            </div>
          }
          <div className="code-error">
            <LiveError />
          </div>
        </LiveProvider>
      </div>
    )
  } else {
    return (
      <div style={{ marginTop: '10px' }}>
        <LiveProvider code={code} scope={{ React, ...scope }}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }
}

CodeBlock.displayName = 'CodeBlock'
