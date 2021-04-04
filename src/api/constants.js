import Axios from 'axios'

export function api() {
  return Axios.create({
    baseURL: 'http://192.168.1.8:3000',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}