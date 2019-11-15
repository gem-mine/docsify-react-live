exports.strip = function(str, tags) {
  const dummyNode = document.createElement("DIV")
  dummyNode.innerHTML = str

  tags = tags ? [].concat(tags) : []

  tags.forEach(tag => {
    const targetNode = dummyNode.querySelector(tag)
    if (targetNode) {
      dummyNode.removeChild(targetNode)
    }
  })

  return dummyNode.innerHTML.trim()
}

exports.fetch = function(str, tag) {
  const dummyNode = document.createElement("DIV")
  dummyNode.innerHTML = str

  return dummyNode.querySelector(tag)
    ? dummyNode.querySelector(tag).innerHTML.trim()
    : ""
}
