import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.storeSub = null
    this.unsubs = []
    this.prepare()
  }
  
  prepare() {
  
  }
  
  isWatchind(key) {
    return this.subscribe.includes(key)
  }
  
  toHTML() {
    return ''
  }
  
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }
  
  $dispatch(action) {
    this.store.dispatch(action)
  }
  
  storeChanged() {
  
  }
  
  
  init() {
    this.initDOMListeners()
  }
  
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
