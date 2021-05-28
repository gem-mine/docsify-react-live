import React, {
  useState, useEffect, useCallback, useMemo
} from 'react'

import LiveProvider from '../Live/LiveProvider'
import LiveEditor from '../Live/LiveEditor'
import LiveError from '../Live/LiveError'
import LivePreview from '../Live/LivePreview'

import HighLightCode from './HighLightCode'

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
  lang,
  css,
  isMobile,
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
  const transformCode = useCallback((_code) => _code, [])
  const insertScope = useMemo(() => ({
    React, ...scope
  }), [])

  return pureRender ? (
    <div className={`code-box pureRender ${className}`}>
      <LiveProvider
        code={code.trim()}
        transformCode={transformCode}
        scope={insertScope}
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
    <div className={`code-box ${className} ${isMobile ? 'mobile' : ''}`}>
      <LiveProvider
        code={code.trim()}
        transformCode={transformCode}
        scope={insertScope}
        disabled={!live}
        language={lang}
      >
        <div className="code-box-demo">
          {
            isMobile && (
            <div className="simulator-header">
              <div className="status-bar" />
            </div>
            )
          }
          <div className="live-demo">
            <LivePreview
              isMobile={isMobile}
            />
          </div>
        </div>
        <div className="code-box-container">
          <div className="code-box-meta markdown">
            { title && <div className="code-box-title"><a>{title}</a></div>}
            <div
            // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: desc || '下面是代码哦'
              }}
            />
            <div className="code-expand-icon" onClick={() => { setCodeShow(!codeShow) }}>
              <img
                alt="expand code"
              // eslint-disable-next-line global-require
                src={require('@/assets/code-open.svg')}
                className={codeShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
              />
              <img
                alt="expand code"
              // eslint-disable-next-line global-require
                src={require('@/assets/code.svg')}
                className={codeShow ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
              />
            </div>
          </div>
          <div style={{
            display: codeShow ? 'block' : 'none'
          }}
          >
            <pre className="editor-wrapper" data-lang={lang || 'jsx'}>
              <code className="code-for-copy">{code}</code>
              <LiveEditor />
            </pre>
            {
            css && (
              <pre className="editor-wrapper css" data-lang="css">
                <code>
                  <HighLightCode
                    code={css}
                  />
                </code>
              </pre>
            )
          }
          </div>
          <div className="code-error">
            <LiveError />
          </div>
        </div>
      </LiveProvider>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'
