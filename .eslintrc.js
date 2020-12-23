module.exports = {
  extends: ['@gem-mine/recommend'],
  rules: {
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off'
  },
  globals: {
    Babel: 'readonly'
  }
}
