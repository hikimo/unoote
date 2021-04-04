import { GET_MORE_NOTES, GET_NOTES } from '../_types/note'

export const getNotes = (payload) => {
  type: GET_NOTES,
  payload
}

export const getMoreNotes = (payload) => {
  type: GET_MORE_NOTES,
  payload
}