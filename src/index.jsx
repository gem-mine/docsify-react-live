import React from 'react'
import ReactDOM from 'react-dom'
import codeBlockWrapper from './hoc/codeBlockWrapper'
import './assets/dev.less'

const code = `
<className>demo-class</className>
<title>测试组件标题</title>
<desc>
测试组件描述
- a
- b
- c
</desc>
<style>
  body {
    height: 30px;
  }
</style>
<script>
const { Button } = soui

return class App extends React.Component {
  render () {
    return <Button type="primary" onClick={() => alert('好的')}>确认</Button>
  }
}
</script>
`

const CodeBlockWrapper = codeBlockWrapper(code, 'true')

ReactDOM.render(
  <CodeBlockWrapper/>,
  document.getElementById('apphook')
)