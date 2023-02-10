export function capitalize (str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function storage (key, data = null) {
  if (!data)
    return JSON.parse(localStorage.getItem(key))

  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if(typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export function camelToDashCase (str) {
  return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase())
}

export function toInlineStyles (styles = {}) {
  return Object.keys(styles).map(style => {
    return `${camelToDashCase(style)}:${styles[style]}`
  }).join('; ')
}

export function debounce(fn, wait) {
  let timeoutFn

  return function (...args) {
    const later = () => {
      // clearTimeout(timeoutFn)
      fn.apply(this, args)
    }
    clearTimeout(timeoutFn)
    timeoutFn = setTimeout(later, wait);
  }
}