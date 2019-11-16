import React from 'react'
import ReactDOM from 'react-dom'
import { generateComponent } from './components'
import './assets/dev.less'

const code = `
  <title>测试组件标题</title>
  <desc>
  测试组件描述
  - a
  - b
  - c
  </desc>
  <style>
    .test{
      height: 100%
    }
  </style>
  <script>
    class Application extends React.Component {
      render() {
        return (
          <div>
            <div className='wrapper22' ref={el => this.el = el}>
              <div>
              <button className='test' onClick={e => {console.log(e)}}>test</button>
              </div>
            </div>
          </div>
        )
      }
    }
  </script>
`

const Component = generateComponent(code, 'jsx')


ReactDOM.render(
  <Component/>,
  document.getElementById('apphook')
)

module.hot && module.hot.accept()