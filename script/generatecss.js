const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const theme = require('../src/constants/palenight')

let result = ''

result += `pre,code ${objectToStyleText(theme.plain, true)}
`

theme.styles.forEach((style) => {
  style.types.forEach((type) => {
    result += `.token.${type} ${objectToStyleText(style.style)}
`
  })
})

fs.writeFileSync(path.resolve(__dirname, '../public/palenight.css'), result)

function objectToStyleText(obj, isImportant) {
  const styles = []
  Object.keys(obj).forEach((key) => {
    styles.push(`${_.kebabCase(key)}: ${obj[key]} ${isImportant ? '!important': ''}`)
  })
  return `{${styles.join(';\r')}}`
}