import React from 'react'
import ReactDOM from 'react-dom'
import codeBlockWrapper from './hoc/codeBlockWrapper'
import './assets/dev.less'

const code = `
<className>demo-class</className>
<title>测试组件标题</title>
<style>
  body {
    height: 30px;
  }
</style>
<script>
const { Button } = soui

export default class App extends React.Component {
  render () {
    return <Button type="primary" onClick={() => alert('好的')}>确认</Button>
  }
}
</script>
`

const CodeBlockWrapper = codeBlockWrapper(code, true)

ReactDOM.render(
  <CodeBlockWrapper/>,
  document.getElementById('apphook')
)

const CodeBlockWrapper2 = codeBlockWrapper(code, false)

ReactDOM.render(
  <CodeBlockWrapper2 />,
  document.getElementById('apphook2')
)