import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core//dom";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { shouldResize, isCell, matrix, nextSelector } from "@/components/table/table.functions";
import { TableSelection } from "@/components/table/TableSelection";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor ($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare () {
    this.selection = new TableSelection()
  }

  init () {
    super.init()

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    const firstCell = this.$root.find('[data-id="0:0"]')
    this.selectCell(firstCell)
  }

  selectCell ($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown (event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if(isCell(event)) {
      const $target = $(event.target)

      if(event.shiftKey) {
        const current = this.selection.current.id(true)
        const target = $target.id(true)

        const $cells = matrix(target, current).map(id =>  this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)

        return false;
      }

      this.selectCell($target)
    } 
  }

  onKeydown (event) {
    const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const $next = this.$root.find(nextSelector(event.key, this.selection.current.id(true)))
      this.selectCell($next)
    }
  }

  onInput (event) {
    this.$emit('table:input', $(event.target))
  }

  toHTML () {
    return createTable(20)
  }
}