import React from 'react'
import ReactDOM from 'react-dom'
import codeBlockWrapper from './hoc/codeBlockWrapper'
import './assets/dev.less'

const code = `
<className>demo-form</className>
<desc>
这里演示 \`Form.Item\` 内有多个元素的使用方式。\`<Form.Item name="field" />\` 只会对它的直接子元素绑定表单功能，例如直接包裹了 Input/Select。如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 \`Form.Item\` 完成。你可以给 \`Form.Item\` 自定义 \`style\` 进行内联布局，或者添加 \`noStyle\` 作为纯粹的无样式绑定组件（类似 3.x 中的 \`getFieldDecorator\`）。

~~~diff
- <Form.Item label="Field" name="field">
-   <Input />
- </Form.Item>
+ <Form.Item label="Field">
+   <Form.Item name="field" noStyle><Input /></Form.Item> // 直接包裹才会绑定表单
+   <span>description</span>
+ </Form.Item>
~~~

这里展示了三种典型场景：

- \`Username\`：输入框后面有描述文案或其他组件，在 \`Form.Item\` 内使用 \`<Form.Item name="field" noStyle />\` 去绑定对应子控件。
- \`Address\`：有两个控件，在 \`Form.Item\` 内使用两个 \`<Form.Item name="field" noStyle />\` 分别绑定对应控件。
- \`BirthDate\`：有两个内联控件，错误信息展示各自控件下，使用两个 \`<Form.Item name="field" />\` 分别绑定对应控件，并修改 \`style\` 使其内联布局。

> 注意，在 label 对应的 Form.Item 上不要在指定 \`name\` 属性，这个 Item 只作为布局作用。

更复杂的封装复用方式可以参考下面的 \`自定义表单控件\` 演示。
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

const CodeBlockWrapper = codeBlockWrapper(code, undefined, undefined, true)

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
import React, { useState } from 'react'

const Demo: React.FC = () => {
  const [top, setTop] = useState(10)
  const [bottom, setBottom] = useState(10)
  return <button>asdasd</button>
}

export default Demo
</script>
`

const CodeBlockWrapper2 = codeBlockWrapper(codeTS, undefined, undefined, true, false, 'tsx', true)

ReactDOM.render(
  <CodeBlockWrapper2 />,
  document.getElementById('apphook2')
)

const CodeBlockWrapper3 = function Pure() {
  return (
    <div>
      <div>纯渲染</div>
      {codeBlockWrapper(code, undefined, undefined, true, true)()}
    </div>
  )
}

ReactDOM.render(
  <CodeBlockWrapper3 />,
  document.getElementById('apphook3')
)
