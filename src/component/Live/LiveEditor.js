import React from 'react'
import LiveContext from './LiveContext'
import Editor from '../Editor'

export default function LiveEditor(props) {
  return (
    <LiveContext.Consumer>
      {({
        code, language, theme, disabled, onChange, disable
      }) => (
        <Editor
          theme={theme}
          code={code}
          language={language}
          disabled={disabled}
          disable={disable}
          onChange={onChange}
          {...props}
        />
      )}
    </LiveContext.Consumer>
  )
}
