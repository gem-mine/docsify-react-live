import transform from './transform'
import errorBoundary from './errorBoundary'
import evalCode from './evalCode'

export const generateElement = ({
  code = '',
  language,
  scope = {}
}, errorCallback) => {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '')
  // NOTE: Support import
  const scripts = codeTrimmed.split('export default')
  const codeForTransform = `(function __innerReactLiveExport() {${transformImport(scripts[0])} ; return (${scripts[1]})})()`
  // NOTE: Workaround for classes and arrow functions.
  const transformed = transform(codeForTransform, language).trim()
  return errorBoundary(evalCode(transformed, scope), errorCallback)
}

export const renderElementAsync = (
  { code = '', scope = {} },
  resultCallback,
  errorCallback
  // eslint-disable-next-line consistent-return
) => {
  const render = element => {
    if (typeof element === 'undefined') {
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'))
    } else {
      resultCallback(errorBoundary(element, errorCallback))
    }
  }

  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError('No-Inline evaluations must call `render`.')
    )
  }

  evalCode(transform(code), { ...scope, render })
}

function transformImport(code) {
  const lines = code.split(/(\n|\r)/).filter(t => t !== '')
  debugger
  return lines.map((lineCode) => {
    return lineCode.trim()
      .replace(/^import\s(.+)\sfrom\s'(.+)'/, 'const $1 = window[\'$2\']')
      .replace(/^(const|var)\s(.+)\s*=\s*require\('(.+)'\)/, 'const $2 = window[\'$3\']')
      .replace(/^\/\/.+$/, '')
  }).filter(t => t !== '')
    .join('\n')
}