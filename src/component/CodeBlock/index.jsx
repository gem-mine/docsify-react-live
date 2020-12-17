import React, { useState, useEffect } from 'react'

import LiveProvider from '../Live/LiveProvider'
import LiveEditor from '../Live/LiveEditor'
import LiveError from '../Live/LiveError'
import LivePreview from '../Live/LivePreview'

import HighLightCode from './HighLightCode'

import palenightTheme from '../../constants/palenight'
import { createStyle, removeStyle } from '../../util/style'
import generateGuid from '../../util/guid'

export default function CodeBlock({
  code,
  style,
  className = '',
  live,
  pureRender,
  title,
  desc,
  scope,
  theme,
  lang,
  css,
  codeShow: propCodeShow = false
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
  const [codeShow, setCodeShow] = useState(propCodeShow)
  return pureRender ? (
    <div className={`code-box pureRender ${className}`}>
      <LiveProvider
        code={code.trim()}
        transformCode={code => code}
        scope={{React, ...scope}}
      >
        <div className="code-box-demo">
          <LivePreview />
        </div>
        <div className="code-error">
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  ) : (
    <div className={`code-box ${className}`}>
      <LiveProvider
        code={code.trim()}
        transformCode={code => code}
        scope={{React, ...scope}}
        disabled={!live}
        theme={theme || palenightTheme}
        language={lang}
      >
        <div className="code-box-demo">
          <LivePreview />
        </div>
        <div className="code-box-meta markdown">
          { title && <div className="code-box-title"><a>{title}</a></div>}
          <div dangerouslySetInnerHTML={{__html: desc || '下面是代码哦，点击右上角可以复制代码' }} />
          <div className="code-expand-icon" onClick={() => {setCodeShow(!codeShow)}}>
            <img alt="expand code"
              src={require('@/assets/code-open.svg')}
              className={codeShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
            />
            <img alt="expand code"
              src={require('@/assets/code.svg')}
              className={codeShow ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
            />
          </div>
        </div>
        <div style={{
          display: codeShow ? 'block' : 'none'
        }}
        >
          <pre className="editor-wrapper" data-lang="jsx">
            <code className="code-for-copy">{code}</code>
            <LiveEditor />
          </pre>
          {
            css && (
              <pre className="editor-wrapper css" data-lang="css">
                <code>
                  <HighLightCode
                    code={css}
                    theme={theme}
                  />
                </code>
              </pre>
            )
          }
        </div>
        <div className="code-error">
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'
