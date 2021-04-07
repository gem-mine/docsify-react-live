import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LiveContext from './LiveContext'
import { generateElement, renderElementAsync } from '../../util/transpile'

export default class LiveProvider extends Component {
  static defaultProps = {
    code: '',
    noInline: false,
    language: 'jsx',
    disabled: false
  };

  static propTypes = {
    children: PropTypes.array,
    code: PropTypes.string,
    disabled: PropTypes.bool,
    language: PropTypes.string,
    noInline: PropTypes.bool,
    scope: PropTypes.object,
    theme: PropTypes.object,
    transformCode: PropTypes.func
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      code, scope, transformCode, noInline, language
    } = this.props

    this.transpile({
      code, scope, transformCode, noInline, language
    })
  }

  componentDidUpdate({
    code: prevCode,
    scope: prevScope,
    noInline: prevNoInline,
    transformCode: prevTransformCode
  }) {
    const {
      code, scope, noInline, transformCode, language
    } = this.props
    if (
      code !== prevCode
      || scope !== prevScope
      || noInline !== prevNoInline
      || transformCode !== prevTransformCode
    ) {
      this.transpile({
        code, scope, transformCode, noInline, language
      })
    }
  }

  onChange = (code) => {
    if (typeof code !== 'string') {
      return
    }
    const {
      scope, transformCode, noInline, language
    } = this.props
    this.transpile({
      code, scope, transformCode, noInline, language
    })
  };

  onError = (error) => {
    this.setState({ error: error.toString() })
  };

  transpile = ({
    code, scope, transformCode, noInline = false, language
  }) => {
    // Transpilation arguments
    const input = {
      code: transformCode ? transformCode(code) : code,
      language,
      scope
    }

    const errorCallback = (err) => {
      this.setState({ element: undefined, error: err.toString() })
    }

    // State reset object
    const state = { unsafeWrapperError: undefined, error: undefined }
    const renderElement = (element) => this.setState({ ...state, element })

    try {
      if (noInline) {
        this.setState({ ...state, element: null }) // Reset output for async (no inline) evaluation
        renderElementAsync(input, renderElement, errorCallback)
      } else {
        renderElement(generateElement(input, errorCallback))
      }
    } catch (error) {
      this.setState({ ...state, error: error.toString() })
    }
  };

  render() {
    const {
      children, code, language, theme, disabled
    } = this.props
    return (
      <LiveContext.Provider
        value={{
          ...this.state,
          code,
          language,
          theme,
          disabled,
          onError: this.onError,
          onChange: this.onChange
        }}
      >
        {children}
      </LiveContext.Provider>
    )
  }
}
