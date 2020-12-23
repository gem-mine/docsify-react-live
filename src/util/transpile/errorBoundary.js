import React, { Component } from 'react'

const errorBoundary = (Element, errorCallback) => class ErrorBoundary extends Component {
  componentDidCatch(error) {
    errorCallback(error)
  }

  render() {
    if (!Element) {
      return <div />
    }
    return typeof Element === 'function' ? <Element /> : Element
  }
}

export default errorBoundary
