import { createStore, combineReducers } from 'redux'

// Reducers
import name from './_reducers/name'

const reducers = combineReducers({
  name
})

const store = createStore(
  reducers
)

export default store
