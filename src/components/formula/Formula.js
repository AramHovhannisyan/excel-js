import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor ($root) {
    // console.log('FormulRoot:', $root);

    super($root, {
      name: 'Formula',
      listeners: ['input']
    })
  }

  onInput (event) {
    console.log('Root:', this.$root);
    console.log('data', event.target.textContent);
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
}
