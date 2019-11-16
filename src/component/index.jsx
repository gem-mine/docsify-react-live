import React from 'react'
import striptags from '../util/stripTags'
import CodeBlock from './code-block'
import marked from 'marked'
import '../assets/demoBlock.less'

export const createComponent = function(code, live = true) {
  const codeInfo = striptags.fetch(code, ['title', 'script', 'desc', 'style', 'className'])
  const desc = marked(codeInfo.desc)
  return class CodeBlockWrapper extends React.Component {
    render() {
      return (
        <CodeBlock
          code = { codeInfo.script }
          style = { codeInfo.style }
          className = { codeInfo.className }
          live = { live }
          title = { codeInfo.title }
          desc = { desc }
        >
        </CodeBlock>
      )
    }
  }
}
