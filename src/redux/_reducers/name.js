import { SET_NAME } from '../_types/name'

const initialState = {
  name: ''
}

const name = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}

export default name