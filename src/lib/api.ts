import axios from 'axios'

export const api = axios.create({
  baseURL: [
    'http://172.20.10.3:8000',
    'http://192.168.0.6:8000',
    'http://192.168.0.10:8000',
  ][1],
})
