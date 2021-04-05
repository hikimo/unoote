import { api } from './constants'

export const requestNoteAPI = async (params = '') => {
  const url = `/api/v1/notes${params}`
  
  try {
    return await api().get(url)
  } catch (e) {
    console.error('ERROR:', e)
    return false
  }
}

export const requestSaveNoteAPI = async (payload) => {
  const url = '/api/v1/note/create'

  try {
    return await api().post(url, { ...payload })
  } catch (e) {
    console.error('ERROR:', e)
    return false
  }
}

export const requestUpdateNoteAPI = async (payload) => {
  const url = '/api/v1/note/update'

  try {
    return await api().patch(url, { ...payload })
  } catch (e) {
    console.error('ERROR:', e)
    return false
  }
}