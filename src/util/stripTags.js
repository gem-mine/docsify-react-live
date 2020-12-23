exports.fetch = function fetch(str, tags) {
  const result = {}
  tags.forEach((tag) => {
    const reg = new RegExp(`<${tag}>([\\s\\S]+)</${tag}>`, 'm')
    const matches = str.match(reg)
    result[tag] = matches?.[1].trim() || ''
  })
  return result
}
