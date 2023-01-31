class Dom {
  constructor (selector) {
    this.$el = (typeof selector === 'string') ? document.querySelector(selector) : selector
  }

  html (node) {
    if (typeof node === 'string') {
      // console.log('this.$el:', this.$el, 'node:', node);
      this.$el.innerHTML = node;
      return this;
    }

    return this.$el.innerHTML;
  }

  text (text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') return this.$el.value.trim()

    return this.$el.textContent.trim()
  }

  clear () {
    this.html('');
    return this
  }

  append (node) {
    this.$el.append(node.$el)
    return this;
  }

  on (event, callback) {
    this.$el.addEventListener(event, callback)
    return this;
  }

  off (event, callback) {
    this.$el.removeEventListener(event, callback)
    return this;
  }

  closest (selector) {
    return $(this.$el.closest(selector))
  }

  getCoords () {
    return this.$el.getBoundingClientRect()
  }

  get data () {
    return this.$el.dataset
  }

  find (selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll (selector) {
    return this.$el.querySelectorAll(selector)
  }

  css (styles = {}) {
    Object
      .keys(styles)
      .forEach( styleKey => { this.$el.style[styleKey] = styles[styleKey] })
  }

  addClass (className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass (className) {
    this.$el.classList.remove(className)
    return this
  }

  focus () {
    this.$el.focus()
    return this
  }

  id (parse) {
    if (parse) {
      const parsed = this.data.id.split(':')

      return {
        row: parseInt(parsed[0]),
        col: parseInt(parsed[1])
      }
    }
    
    return this.data.id
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}