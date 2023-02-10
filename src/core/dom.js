class Dom {
  constructor (selector) {
    this.$el = (typeof selector === 'string') ? document.querySelector(selector) : selector
  }

  html (node) {
    if (typeof node === 'string') {
      this.$el.innerHTML = node;
      return this;
    }

    return this.$el.innerHTML;
  }

  text (text) {

    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }

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

  getStyles (styles = []) {
    return styles.reduce((res, el) => {
      res[el] = this.$el.style[el]
      return res
    }, {})
  }

  attr (name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }

    return this.$el.getAttribute(name)
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