import { _poly } from './transform'

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])

  const addReturnCode = code.replace(/(\(function __innerReactLiveExport)/, 'return $1')
  // eslint-disable-next-line no-new-func
  const res = new Function('_poly', ...scopeKeys, addReturnCode)
  return res(_poly, ...scopeValues)
}

export default evalCode
