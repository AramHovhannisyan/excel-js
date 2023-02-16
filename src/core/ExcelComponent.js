import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor ($root, options = {}) {
    super($root, options.listeners)
    this.emitter = options.emitter
    this.store = options.store
    this.storeSub = null
    this.unsubs = []
    this.subscribedEvents = options.subscribedEvents || []
    this.prepare()
  }

  prepare () {}

  init() {
    this.initDOMListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }

  $dispatch (action) {
    this.store.dispatch(action)
  }

  storeChanged (changes) {
    console.log('changes:', changes);
  }

  isWatching(key) {
    return this.subscribedEvents.includes(key)
  }

  $subscribe (fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
    if (this.storeSub){
      this.storeSub.unsubscribe()
    }
  }

  toHTML () {
    return ''
  }
}
