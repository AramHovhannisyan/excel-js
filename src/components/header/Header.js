import { ExcelComponent } from "@core/ExcelComponent";
import { changeTitle } from "@/redux/actions";
import { debounce } from "@core/utils";
import { $ } from "@core/dom";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor ($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare () {
    this.onInput = debounce(this.onInput)
  }

  onInput (event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle(
      $target.text()
    ))
  }

  toHTML () {
    return `
      <input type="text" class="input" value="${this.store.getState().title || 'Default Title'}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }
}
