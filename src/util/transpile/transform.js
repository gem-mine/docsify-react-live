import { transform as _transform } from 'buble'
// import assign from 'core-js/fn/object/assign'

// polyfill to inject
export const _poly = { }

const opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
}

export default code => _transform(code, opts).code
