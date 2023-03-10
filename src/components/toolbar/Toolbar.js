import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { createToolbar } from "@/components/toolbar/toolbar.template";
import { $ } from "@core//dom";
import { defaultStyles } from "@/constants";

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor ($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribedEvents: ['currentStyles'],
      ...options
    })
  }

  prepare () {
    this.initState(defaultStyles)
  }

  storeChanged (changes) {
    this.setState(changes.currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  onClick (event) {
    if ($(event.target).data.type === 'button') {
      const value = JSON.parse($(event.target).data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }

  toHTML () {
    return this.template
  }
}
