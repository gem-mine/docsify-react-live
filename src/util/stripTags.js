exports.fetch = function(str, tags) {
  const result = {}
  const dummyNode = document.createElement('DIV')
  dummyNode.innerHTML = str
  tags.forEach((tag) => {
    const value = dummyNode.querySelector(tag)
      ? dummyNode.querySelector(tag).innerHTML.trim()
      : ""
    result[tag] = value
  })
  return result
}
