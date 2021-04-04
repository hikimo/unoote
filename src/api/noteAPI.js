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