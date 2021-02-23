import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storeSub = null
    this.prepare()
    this.unsubs = []
  }
  
  prepare() {
  
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
  
  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
