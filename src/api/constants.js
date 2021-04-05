import Axios from 'axios'

export function api() {
  return Axios.create({
    baseURL: 'https://u-noote-server.herokuapp.com',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}