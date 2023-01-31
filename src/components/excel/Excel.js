import { $ } from "@core/dom"
import { Emitter } from "@core/Emitter"

export class Excel {
  constructor (selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot () {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: new Emitter()
    }

    this.components = this.components.map(Component => {
      const className = Component.className
      const $el = $.create('div', className)
      const component = new Component($el, componentOptions);
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

  destroy () {
    this.components.forEach(component => component.destroy())
  }
}
