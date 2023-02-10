import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { shouldResize, isCell, matrix, nextSelector } from "@/components/table/table.functions";
import { TableSelection } from "@/components/table/TableSelection";
import * as actions from "@/redux/actions"
import { defaultStyles } from "@/constants";
import { parse } from '@core/parse'

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

    

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        ids: this.selection.selectedIds,
        value
      }))
    })

    const firstCell = this.$root.find('[data-id="0:0"]')
    this.selectCell(firstCell)
  }

  selectCell ($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const selectedElemStyles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(selectedElemStyles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.log('Resize Error:', error);
    }
  }

  onMousedown (event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  toHTML () {
    return createTable(20, this.store.getState())
  }
}