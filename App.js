import React from 'react'

import { Provider } from 'react-redux'
import store from './src/redux/store'

import MainNavigator from './src/navigation/MainNavigation'

function App() {
  return (
    <>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </>
  )
}

export default App