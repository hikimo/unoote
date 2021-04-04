import { createStore, combineReducers } from 'redux'

// Reducers
import name from './_reducers/name'
import note from './_reducers/note'

const reducers = combineReducers({
  name,
  note
})

const store = createStore(
  reducers
)

export default store
