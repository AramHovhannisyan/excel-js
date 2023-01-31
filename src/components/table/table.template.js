const CODES = {
  A: 65,
  Z: 90
}

function createRow (index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${index}">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toColumn (col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toChar (_, index) {
  return String.fromCharCode(CODES.A + index)
}

// function toCell (rowIndex, index) {
//   return `<div class="cell" contenteditable="" data-col="${index}" data-row="${rowIndex}" ></div>`
// }

function toCell (rowIndex) {
  return function (_, colIndex) {
    return `<div class="cell" contenteditable="" data-type="cell" data-col="${colIndex}" data-id="${rowIndex}:${colIndex}" ></div>`
  }
}

export function createTable (rowsCount = 15) {

  const rows = []
  const colsCount = 26
  const cols = new Array(colsCount)
                .fill('')
                .map(toChar)
                .map(toColumn)
                .join('');
  
  rows.push(createRow('', cols))
  
  for(let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
                    .fill('')
                    // .map((_, colIndex) => toCell(rowIndex, colIndex))
                    .map(toCell(rowIndex))
                    .join('')
    rows.push(createRow(rowIndex + 1, cells))
  }

  return rows.join('')

  return `
      <div class="row">
        <div class="row-info">
          1
        </div>

        <div class="row-data">
          <div class="cell selected" contenteditable="">A1</div>
          <div class="cell" contenteditable="">B2</div>
          <div class="cell" contenteditable="">C3</div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">
          2
        </div>

        <div class="row-data">
          <div class="cell">A1</div>
          <div class="cell">B2</div>
          <div class="cell">C3</div>
        </div>
      </div>
    `
}