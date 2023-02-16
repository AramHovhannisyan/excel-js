export class Page {
  constructor (params) {
    this.params = params
  }

  // returns HTML
  getRoot () {
    throw new Error('Method "getRoot" should be implemented')
  }

  afterRender () {}

  destroy () {}
}