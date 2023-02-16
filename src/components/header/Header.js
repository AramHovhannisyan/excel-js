import { ExcelComponent } from "@core/ExcelComponent";
import { changeTitle } from "@/redux/actions";
import { debounce } from "@core/utils";
import { $ } from "@core/dom";
import { ActiveRoute } from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor ($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick (event) {
    const action = $(event.target).data.action

    if (action === 'delete') {
      const decision = confirm('Are You Sure You Wanna Delete This Item ?')
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if (action === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  toHTML () {
    return `
      <input type="text" class="input" value="${this.store.getState().title || 'Default Title'}" />

      <div>

        <div class="button">
          <i class="material-icons" data-action="delete">delete</i>
        </div>

        <div class="button">
          <i class="material-icons" data-action="exit">exit_to_app</i>
        </div>

      </div>
    `
  }
}
