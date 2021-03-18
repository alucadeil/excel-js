import {Page} from '@core/Page'
import {$} from '@core/dom'
import {createRecordsTable} from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db'). html(`
        <div class="db__header">
            <h1>Панель управления Excel</h1>
        </div>

        <div class="db__new">
            <div class="db__show">
                <a href="#excel/${now}" class="db__create">
                    Создать <br> страницу
                </a>
                ${createRecordsTable(false)}
            </div>
        </div>

        <div class="db__table db__view">
            ${createRecordsTable()}
        </div>
    `)
  }
}
