// import assign from 'core-js/fn/object/assign'
import * as Babel from '@babel/standalone'
// polyfill to inject
export const _poly = { }

window.Babel = Babel

function generateUID(length) {
  return window.btoa(
    Array.from(
      window.crypto.getRandomValues(new Uint8Array(length * 2))
    ).map((b) => String.fromCharCode(b))
      .join('')
  ).replace(/[+/]/g, '')
    .substring(0, length)
}

function transform(code, language) {
  const transformed = Babel.transform(code, {
    presets: ['env', 'react', 'typescript'],
    filename: `${generateUID(8)}.${language}`,
    plugins: [
      'proposal-class-properties',
      'proposal-optional-chaining',
      ['proposal-decorators', { legacy: true }]
    ]

  })
  return transformed.code
}

export default transform
