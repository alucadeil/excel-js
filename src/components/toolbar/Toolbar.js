import {createToolbar} from '@/components/toolbar/toolbar.template'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {$} from '@core/dom'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }
  
  prepare() {
    this.initState(defaultStyles)
  }
  
  get template() {
    return createToolbar(this.state)
  }
  
  toHTML() {
    return this.template
  }
  
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }
  
  onClick(event) {
    const $target = $(event.target)
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
