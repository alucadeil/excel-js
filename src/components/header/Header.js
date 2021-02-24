import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {ActiveRoute} from '@core/router/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
  
  
  onClick(event) {
    const $target = $(event.target)
    if ($target.dataset.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.dataset.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
            <input type="text" class="input" value="${title}">
            <div>
                <div class="button" data-button="remove">
                        <span class="material-icons" data-button="remove">
                            delete
                        </span>
                </div>
                <div class="button" data-button="exit">
                        <span class="material-icons" data-button="exit">
                            exit_to_app
                        </span>
                </div>
            </div>`
  }
}
