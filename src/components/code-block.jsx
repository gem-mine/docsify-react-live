import React, { useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export default function CodeBlock({ 
  code,
  className,
  live,
  render,
  scope,
  title,
  markdown
}) {
  const language = className.replace(/language-/, '')
  const [codeShow, setCodeShow] = useState(true)
  if (live) {
    return (
      <div className="code-box">
        <LiveProvider
          code={code.trim()}
          transformCode={code => code}
          scope={{React}}
        >
          <div className="code-box-demo">
            <LivePreview />
          </div>
          <div className="code-box-meta markdown">
            { title && <div className="code-box-title"><a>{title}</a></div>}
            { markdown }
            <span className="code-expand-icon" onClick={() => {setCodeShow(!codeShow)}}>
              <img alt="expand code" src={require("@/assets/code-open.svg")} className={codeShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'} />
              <img alt="expand code" src={require("@/assets/code.svg")} className={codeShow ? 'code-expand-icon-hide' : 'code-expand-icon-show'} />
            </span>
          </div>
          {
            codeShow && <div style={{ backgroundColor: 'black' }} className="EditorWrapper">
              <LiveEditor />
            </div>
          }
          <div style={{ backgroundColor: 'red' }}>
            <LiveError />
          </div>
        </LiveProvider>
      </div>
    )
  }

  if (render) {
    return (
      <div style={{ marginTop: '10px' }}>
        <LiveProvider code={code} scope={{ React, ...scope }}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Highlight {...defaultProps} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
CodeBlock.displayName = 'CodeBlock'
