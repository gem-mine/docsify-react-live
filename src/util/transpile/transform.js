// import assign from 'core-js/fn/object/assign'

// polyfill to inject
export const _poly = { }

function transform(code) {
  return Babel && Babel.transform(code, {
    presets: ['es2015', 'react', 'stage-2']
  }).code || code
}

export default transform
