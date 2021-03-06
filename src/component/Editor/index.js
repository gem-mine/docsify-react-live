import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor'
import Highlight, { Prism } from 'prism-react-renderer'

class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string,
    disabled: PropTypes.bool,
    language: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    theme: PropTypes.object
  };

  static getDerivedStateFromProps(props, state) {
    if (props.code !== state.prevCodeProp) {
      return { code: props.code, prevCodeProp: props.code }
    }

    return null
  }

  state = {
    code: ''
  };

  updateContent = (code) => {
    this.setState({ code }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.code)
      }
    })
  };

  highlightCode = (code) => (
    <Highlight
      Prism={Prism}
      code={code}
      language={this.props.language}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );

  render() {
    const {
      style,
      // code: _code,
      // onChange,
      // language,
      theme,
      ...rest
    } = this.props
    const { code } = this.state

    const baseTheme = theme && typeof theme.plain === 'object' ? theme.plain : {}

    return (
      <Editor
        value={code}
        padding={10}
        highlight={this.highlightCode}
        onValueChange={this.updateContent}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'Roboto Mono,Monaco,courier,monospace',
          ...baseTheme,
          ...style
        }}
        {...rest}
      />
    )
  }
}

export default CodeEditor
