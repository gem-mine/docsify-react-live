import React from 'react'
import ReactDOM from 'react-dom'
import codeBlockWrapper from './hoc/codeBlockWrapper'
import './assets/dev.less'

const code = `
<className>demo-class</className>
<title>JS测试</title>
<desc>asda
asd
asd
1. 123123
2. 123123

> # Foo
> bar
> baz

\`\`\` diff
- <Form.Item label="Field" name="field"></desc>
-   <Input />
- </Form.Item>
+ <Form.Item label="Field">
+   <Form.Item name="field" noStyle><Input /></Form.Item> // 直接包裹才会绑定表单
+   <span>description</span>
+ </Form.Item>
\`\`\`
</desc>
<style>
  body {
    height: 30px;
  }
</style>
<script>
const { Button } = require('soui')

const text = '确定'

export default class App extends React.Component {
  render () {
    return <Button type="primary" onClick={() => alert('好的')}>{text}</Button>
  }
}
</script>
<css>
.body {
  height: 100px;
}
</css>
`

const CodeBlockWrapper = codeBlockWrapper(code, undefined,undefined, true)

ReactDOM.render(
  <CodeBlockWrapper />,
  document.getElementById('apphook')
)

const codeTS = `
<className>demo-class</className>
<title>TS测试</title>
<style>
  body {
    height: 30px;
  }
</style>
<script>
import { Button } from 'soui'

const text: string = '确定TS'

export default class App extends React.Component {
  render () {
    return <Button type="primary" onClick={() => alert('好的')}>{text}</Button>
  }
}
</script>
`

const CodeBlockWrapper2 = codeBlockWrapper(codeTS, undefined,undefined, true, false, 'tsx', true)

ReactDOM.render(
  <CodeBlockWrapper2 />,
  document.getElementById('apphook2')
)

const CodeBlockWrapper3 = function Pure() {
  return (
    <div>
      <div>纯渲染</div>
      {codeBlockWrapper(code, undefined,undefined, true, true)()}
    </div>
  )
}

ReactDOM.render(
  <CodeBlockWrapper3 />,
  document.getElementById('apphook3')
)