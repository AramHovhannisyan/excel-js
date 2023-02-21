import { Page } from "@core/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { createStore } from '@core/store/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitialState } from '@/redux/initialState'
import { storage, debounce } from '@core/utils'

function storageName (param) {
  return `excel:${param}`
}

export class ExcelPage extends Page {

  constructor (param) {
    super(param)

    this.storeSub = null
  }

  getRoot () {
    const params = this.params || Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const storeListener = debounce(state => {
      storage(storageName(params), state)
      // console.log('App State:', state);
    })

    this.storeSub = store.subscribe(storeListener, 300)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender () {
    this.excel.init()
  }

  destroy () {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}