export function createStyle(css, guid) {
  const style = document.createElement('style')

  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  style.setAttribute('react-live-id', guid)
  document.head.appendChild(style)
}

export function removeStyle(guid) {
  const style = document.querySelector(`style[react-live-id=${guid}]`)
  style.parentNode.removeChild(style)
}
