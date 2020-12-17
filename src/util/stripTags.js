exports.fetch = function(str, tags) {
  const result = {}
  tags.forEach((tag) => {
    const reg = new RegExp(`<${tag}>(.+)</${tag}>`, 'ms')
    const matches = str.match(reg)
    result[tag] = matches?.[1].trim() || ''
  })
  return result
}
