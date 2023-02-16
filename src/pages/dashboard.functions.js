import { storage } from "@core/utils"

export function createRecordsTable () {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>You Don't Have Any Table Yet</p>`
  }

  return `<div class="db__list-header">
            <span>Title</span>
            <span>Date Opened</span>
          </div>

          <ul class="db__list">
            ${keys.map(toHtml).join('')}
          </ul>`
}

function toHtml (key) {
  const id = key.split('excel:')[1]
  const model = storage(key)

  return `<li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>${new Date(model.dateOpened).toLocaleDateString('hy-AM')} ${new Date(model.dateOpened).toLocaleTimeString('hy-AM')}</strong>
          </li>`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if(!key.includes('excel')) {
      continue
    }

    keys.push(key)
  }

  return keys
}