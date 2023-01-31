export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix (targetId, currentId) {
  const rows = range(currentId.row, targetId.row)
  const cols = range(currentId.col, targetId.col)

  return cols.reduce(
    (acc, col) => {
      rows.forEach(row => {
        const id = `${row}:${col}`
        acc.push(id)
      });
      
      return acc
    },
    []
  );
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row += 1
      break;
    case 'Tab':
      case 'ArrowRight':
        col += 1
      break;
    case 'ArrowLeft':
      col = col -1 < MIN_VALUE ? MIN_VALUE : col -1
      break;
    case 'ArrowUp':
      row = row -1 < MIN_VALUE ? MIN_VALUE : row -1
      break;
  
    default:
      break;
  }

  return `[data-id="${row}:${col}"]`
}

function range (start, end) {
  if(start > end) {
    [end, start] = [start, end]
  }

  const length = end - start + 1;
  
  return new Array(length)
    .fill("")
    .map((el, index) => { return parseInt(index) + parseInt(start) })
}