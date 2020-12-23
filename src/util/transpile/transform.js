import * as Babel from '@babel/standalone'
// polyfill to inject
export const _poly = { }

window.Babel = Babel

function transform(code, language) {
  const transformed = Babel.transform(code, {
    presets: [
      ['env', {
        targets: {
          ie: '11',
          chrome: '75'
        }
      }],
      'react',
      'typescript'
    ],
    filename: `${Math.random().toString(36).substring(7)}.${language}`,
    plugins: [
      'proposal-class-properties',
      'proposal-optional-chaining',
      ['proposal-decorators', { legacy: true }]
    ]

  })
  return transformed.code
}

export default transform
