import React from 'react'

import striptags from '../util/stripTags'
import CodeBlock from '../component/CodeBlock'
import '../assets/demoBlock.less'

export default function codeBlockWrapper(
  code,
  scope,
  theme,
  // 注释中提取的值，必须是false
  live = false,
  pureRender = false,
  lang,
  codeShow = false,
  isMobile = false,
) {
  const codeInfo = striptags.fetch(code, ['title', 'script', 'desc', 'style', 'className', 'css'])
  let desc
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    desc = require('marked')(codeInfo.desc)
  } else {
    desc = window.marked(codeInfo.desc)
  }

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
        codeShow={codeShow}
        isMobile={isMobile}
      />
    )
  }

  return DemoBlockWrapper
}
