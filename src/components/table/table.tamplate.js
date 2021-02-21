const CODES = {
  A: 65,
  Z: 90
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  
  rows.push(createRow('', cols))
  
  const cells = new Array(colsCount).fill('')
      .map(createCell)
      .join('')
  
  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(i, cells))
  }
  return rows.join('')
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function createRow(index, content) {
  return `
    <div class="row">
     <div class="row-info">${index}</div>
     <div class="row-data">${content}</div>
    </div>
  `
}

function createCol(col) {
  return `
    <div class="column">
        ${col}
    </div>
  `
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}
