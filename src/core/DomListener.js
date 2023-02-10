import { capitalize } from "@core/utils";

export class DomListener {
  constructor ($root, listeners = []) {
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners () {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      if (!this[methodName]) {
        throw new Error(`method ${this[methodName]} is not implemented for ${this.name || ''} Component`)
      }

      this[methodName] = this[methodName].bind(this)

      this.$root.on(listener, this[methodName])
    })
  }

  removeDOMListeners () {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      this.$root.off(listener, this[methodName])

      // console.log(listener, this[methodName]);
    })
  }
}

function getMethodName (event) {
  return 'on' + capitalize(event)
}
