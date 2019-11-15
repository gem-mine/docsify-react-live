import React from 'react'
import ReactDOM from 'react-dom'
import { generateComponent } from './components'
import './assets/dev.less'

const cssResources = '@import url("//unpkg.com/element-ui/lib/theme-default/index.css");'
const bootCode = ''

const code = `
  <desc>hello word</desc>
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

const Component = generateComponent(code, 'jsx', '', cssResources, bootCode)


ReactDOM.render(
  <Component/>,
  document.getElementById('apphook')
)
