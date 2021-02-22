const CODES = {
  A: 65,
  Z: 90
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
     <div class="row-info">
        ${index}
        ${resize}
     </div>
     <div class="row-data">${content}</div>
    </div>
  `
}

function createCell(row) {
  return function(_, col) {
    return `
     <div class="cell" contenteditable
       data-col="${col}"
       data-id="${row}:${col}"
       data-type="cell"></div>
   `
  }
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

export function createTable(rowsCount = 200) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  
  rows.push(createRow('', cols))
  
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('')
        //  .map((_, col) => createCell(row, col))
        .map(createCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }
  return rows.join('')
}
