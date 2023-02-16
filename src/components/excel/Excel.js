import { $ } from "@core/dom"
import { Emitter } from "@core/Emitter"
import { StoreSubscriber } from "@core/StoreSubscriber"
import { updateDate } from "@/redux/actions"

export class Excel {
  constructor (options) {
    this.components = options.components || []
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot () {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: new Emitter(),
      store: this.store
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

  init () {
    this.store.dispatch(updateDate())
    this.components.forEach(Component => { Component.init() });
    this.subscriber.subscribeComponents(this.components)
  }

  destroy () {
    this.components.forEach(component => component.destroy())
    this.subscriber.unsubscribeFromStore()
  }
}
