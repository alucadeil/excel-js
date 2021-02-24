import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function createRow(index, content, isHeader = false, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  const header = isHeader ? 'row--header' : ''
  return `
    <div
      class="row ${header}"
      data-type="resizable"
      data-row="${index}"
      style="height: ${height}"
    >
     <div class="row-info">
        ${index}
        ${resize}
     </div>
     <div class="row-data">${content}</div>
    </div>
  `
}

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
     <div class="cell" contenteditable
       data-col="${col}"
       data-id="${id}"
       data-type="cell"
       data-value="${data || ''}"
       style="${styles}; width: ${width}">
       ${parse(data) || ''}
        </div>
   `
  }
}

function createCol({col, index, width}) {
  return `
    <div
    class="column"
    data-type="resizable"
    data-col="${index}"
    style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

export function createTable(rowsCount = 200, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createCol)
      .join('')
  
  rows.push(createRow('', cols, true, {}))
  
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('')
        .map(createCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, false, state.rowState))
  }
  return rows.join('')
}
