export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select ($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup ($cells) {
    this.clear()
    $cells.forEach($cell => {
      this.group.push($cell)
      $cell.addClass(TableSelection.className)
    })
  }

  get selectedIds () {
    return this.group.map(el => el.id())
  }

  applyStyle (style) {
    this.group.forEach($el => $el.css(style))
  }

  clear () {
    this.group.forEach(e => e.removeClass(TableSelection.className))
    this.group = []

  }
}