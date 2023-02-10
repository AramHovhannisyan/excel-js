import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { initialState } from '@/redux/initialState'
import { storage, debounce } from '@core/utils'
import './scss/index.scss'

const store = createStore(rootReducer, initialState)

const storeListener = state => {
  storage('excel-state', state)
  console.log('App State:', state);
}

store.subscribe(debounce(storeListener, 300))

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()