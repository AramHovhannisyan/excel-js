import { $ } from "@core/dom"

export class Excel {
  constructor (selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot () {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const className = Component.className
      const $el = $.create('div', className)
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el)

      return component;
    });

    return $root;
  }

  render () {
    $(this.$el).append(this.getRoot())
    this.components.forEach(Component => {
      Component.init()
    });
  }
}
