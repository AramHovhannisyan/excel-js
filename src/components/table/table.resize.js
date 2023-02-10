import { $ } from "@core/dom"

export function resizeHandler ($root, event) {
  return new Promise(function(resolve) {
    resizeBy = event.target.dataset.resize
    const resizer = $(event.target)
    const parent = resizer.closest('[data-type="resizable"]')
    const parentColIndex = parent.data.col
    const coords = parent.getCoords()
    let delta, value

    const sideProp = resizeBy === 'col' ? 'bottom' : 'right'
    resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = moveEvent => {
      if (resizeBy === 'col') {
        delta = moveEvent.pageX - coords.right
        value = coords.width + delta
        resizer.css({ right: -delta + 'px' })
      } else {
        delta = moveEvent.pageY - coords.bottom
        value = coords.height + delta
        resizer.css({ bottom: -delta + 'px' })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (resizeBy === 'col') {
        $root.findAll(`[data-col="${parentColIndex}"]`)
            .forEach(el => $(el).css({width: value + 'px'}))
      }else {
        const parentRowIndex = parent.data.row
        parent.css({height: value + 'px'})
      }
      
      resolve({
        type: resizeBy,
        id: parent.data[resizeBy],
        value
      })
      
      resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}