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

  findAll (selector) {
    return this.$el.querySelectorAll(selector)
  }

  css (styles = {}) {
    Object
      .keys(styles)
      .forEach( styleKey => { this.$el.style[styleKey] = styles[styleKey] })
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