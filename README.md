# docsify-react-live

提供react组件的实时渲染和实时编辑

## QuickStart

```js
<script src="../../dist/docsify-react-live.min.js"></script>

<script>
window.$docsify = {
  plugins: [
    (function () {
      return ReactLiveBox.create(scope, theme)
    })()
  ],
}
</script>
```
- scope 传递入react组件的局部遍历，如果使用`UMD`包，此处无需传入
- theme `prismjs`主题对象，更为方便的方法是用`prismjs`的css主题

代码块中如下编写

```
/* react live */
<className>demo-class</className>
<title>测试组件标题</title>
<desc>
测试组件标题
- 测试
</desc>
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
```

- live 表示是否要实时编辑
- className 生成的HTML中额外加入的className
- style 额外注入全局的样式
- script 代码内容
- desc 描述，可用`MarkDown`语法
