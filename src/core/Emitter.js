export class Emitter {
  constructor () {
    this.listeners = {}
  }

  subscribe (eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)

    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener != fn)
    }
  }

  emit (event, ...args) {
    if (!Array.isArray(this.listeners[event])) return false

    this.listeners[event].forEach(listener => {
      listener(...args)
    });
  }
}
