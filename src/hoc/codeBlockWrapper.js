import React from 'react'
import striptags from '../util/stripTags'
import CodeBlock from '../component/CodeBlock'
import marked from 'marked'
import '../assets/demoBlock.less'

export default function codeBlockWrapper(code, live = true, scope, theme) {
  const codeInfo = striptags.fetch(code, ['title', 'script', 'desc', 'style', 'className'])
  const desc = marked(codeInfo.desc)

  function DemoBlockWrapper() {
    return (
      <CodeBlock
        code = { codeInfo.script }
        style = { codeInfo.style }
        className = { codeInfo.className }
        live = { live }
        title = { codeInfo.title }
        desc = { desc }
        scope = { scope }
        theme = { theme }
      >
      </CodeBlock>
    )
  }

  return DemoBlockWrapper
}
