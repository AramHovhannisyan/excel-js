import { createStore } from "./createStore";

const defaultState = {
  count: 0,
}
function reducer (state = defaultState, action) {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }

  return state
}

describe ('createStore', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, defaultState)
    handler = jest.fn()
  })
  
  test('Should Return Store Obj', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return obj as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return defaultState', () => {
    expect(store.getState()).toEqual(defaultState)
  })

  test('should change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action does not exist', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  test('should call subscriber', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toBeCalled()
    expect(handler).toBeCalledWith(store.getState())
  })


  test('should NOT call subscriber', () => {
    const subscribed = store.subscribe(handler)
    subscribed.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toBeCalled()
  })

  test('works with async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000);
    })
  })

})