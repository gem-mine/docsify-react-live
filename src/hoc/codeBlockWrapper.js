import React from 'react'
import marked from 'marked'
import striptags from '../util/stripTags'
import CodeBlock from '../component/CodeBlock'
import '../assets/demoBlock.less'

export default function codeBlockWrapper(
  code,
  scope,
  theme,
  live = true,
  pureRender = false,
  lang
) {
  const codeInfo = striptags.fetch(code, ['title', 'script', 'desc', 'style', 'className', 'css'])

  const desc = marked(codeInfo.desc)

  function DemoBlockWrapper() {
    return (
      <CodeBlock
        code={codeInfo.script}
        style={codeInfo.style}
        className={codeInfo.className}
        live={live}
        pureRender={pureRender}
        title={codeInfo.title}
        desc={desc}
        scope={scope}
        theme={theme}
        lang={lang}
        css={codeInfo.css}
      >
      </CodeBlock>
    )
  }

  return DemoBlockWrapper
}
