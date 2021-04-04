import {
  SET_LOADING,
  SET_LOADING_MORE,
  GET_NOTES,
  GET_MORE_NOTES,
  GET_NOTES_ERROR,
  SET_NOTES_END,
  SET_PAGE_NOTE,
  RESET_PAGE_NOTE,
  RESTART_NOTE,
  SET_LOADING_REFRESH
} from '../_types/note'

const initialState = {
  data: [],
  page: 0,
  loading: false,
  loadingMore: false,
  loadingRefresh: false,
  end: false,
  error: false
}

const note = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case GET_NOTES:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      }

    case GET_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }

    case GET_MORE_NOTES:
      return {
        ...state,
        loadingMore: false,
        data: [...state.data, ...action.payload]
      }
    case SET_LOADING_MORE:
      return {
        ...state,
        loadingMore: action.payload
      }
    case SET_NOTES_END:
      return {
        ...state,
        loadingMore: false,
        end: true
      }
    case RESTART_NOTE:
      return {
        ...state,
        error: false,
        end: false
      }

    case RESET_PAGE_NOTE:
      return {
        ...state,
        page: 0
      }
    case SET_PAGE_NOTE:
      return {
        ...state,
        page: state.page + 10
      }

    case SET_LOADING_REFRESH:
      return {
        ...state,
        end: action.payload ? false : state.end,
        loadingRefresh: action.payload
      }
    default:
      return state
  }
}

export default note