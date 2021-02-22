import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  let delta
  let value
  const type = event.target.dataset.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })
  
  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    if (type === 'col') {
      const cells = $root.findAll(`[data-col="${$parent.dataset[type]}"]`)
      $parent.css({width: value + 'px'})
      cells.forEach( el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $resizer.removeCss(['opacity', 'bottom', 'right'])
    document.onmouseup = null
  }
}
