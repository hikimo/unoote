import Axios from 'axios'

export function api() {
  return Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}