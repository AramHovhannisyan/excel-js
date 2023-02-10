import { defaultStyles } from "@/constants";
import { toInlineStyles } from "@core/utils";
import { parse } from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth (state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight (state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  
  return function(col, index) {
    const width = getWidth(state.colState, index)

    return {col, index, width}
  }
}

function createRow (index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const rowHeight = getHeight(state, index)

  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${rowHeight}">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toColumn ({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}" >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toChar (_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toCell (rowIndex, state) {
  return function (_, colIndex) {
    const id = `${rowIndex}:${colIndex}`
    const data = state.dataState[id] || ''
    const width = getWidth(state.colState, colIndex)
    const initialStyles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})

    return `<div
              class="cell"
              contenteditable=""
              data-type="cell"
              data-col="${colIndex}"
              data-id="${id}"
              data-value="${data || ''}"
              style="width: ${width}; ${initialStyles}"
            >
            ${parse(data)}</div>`
  }
}

export function createTable (rowsCount = 15, state) {
  const rows = []
  const colsCount = 26
  const cols = new Array(colsCount)
                .fill('')
                .map(toChar)
                .map(withWidthFrom(state))
                .map(toColumn)
                .join('');
  
  rows.push(createRow('', cols, {}))
  
  for(let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
                    .fill('')
                    // .map((_, colIndex) => toCell(rowIndex, colIndex))
                    .map(toCell(rowIndex, state))
                    .join('')
    rows.push(createRow(rowIndex + 1, cells, state.rowState))
  }

  return rows.join('')
}