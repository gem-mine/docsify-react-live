import React, { useState, useEffect } from 'react'
import LiveProvider from '../Live/LiveProvider'
import LiveEditor from '../Live/LiveEditor'
import LiveError from '../Live/LiveError'
import LivePreview from '../Live/LivePreview'

import palenightTheme from '../../constants/palenight'
import { createStyle, removeStyle }from '../../util/style'
import generateGuid from '../../util/guid'

export default function CodeBlock({
  code,
  style,
  className = '',
  live,
  title,
  desc,
  scope,
  theme
}) {
  const [guid] = useState(generateGuid())
  // 注入页面 style
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

  return (
    <div className={`code-box ${className}`}>
      <LiveProvider
        code={code.trim()}
        transformCode={code => code}
        scope={{React, ...scope}}
        theme={theme || palenightTheme}
      >
        <div className="code-box-demo">
          <LivePreview />
        </div>
        <div className="code-box-meta markdown">
          { title && <div className="code-box-title"><a>{title}</a></div>}
          <div dangerouslySetInnerHTML={ {__html: desc || '点击右侧按钮可以实时编辑代码'} } />
          { live &&
              <div className="code-expand-icon" onClick={() => {setCodeShow(!codeShow)}}>
                <img alt="expand code" src={require("@/assets/code-open.svg")} className={codeShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'} />
                <img alt="expand code" src={require("@/assets/code.svg")} className={codeShow ? 'code-expand-icon-hide' : 'code-expand-icon-show'} />
              显示代码
              </div>
          }
        </div>
        {
          codeShow && <div className="editor-wrapper">
            <LiveEditor />
          </div>
        }
        <div className="code-error">
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'
