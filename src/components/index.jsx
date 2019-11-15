import React from 'react'
import striptags from '../util/strip-tags'
import CodeBlock from './code-block'
import marked from 'marked'
import '../assets/demoBlock.less'

export const generateComponent = function(
  code,
  // lang // lang TODO
) {

  const script = striptags.fetch(code, 'script')
  const descOrg = striptags.fetch(code, 'desc')
  const desc = marked && marked(descOrg) || descOrg
  // const noBootCode = code.indexOf('/*no-boot-code*/') > -1
  // if (noBootCode) {
  //   bootCode = ""
  // }
  return class CodeBlockWrapper extends React.Component {
    render() {
      return (
        <CodeBlock
          code= {script}
          className="className"
          live="true"
          title="xx"
          markdown={desc}
        >
        </CodeBlock>
      )
    }
  }
}
