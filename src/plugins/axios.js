
import axios from "axios";
import cookie from 'vue-cookie';

const env = import.meta.env.VITE_APP_ENV
const token = 'Bearer ' + cookie.get('user_token')

let baseURL

if(env === 'production') {
  baseURL = ''
} else {
  baseURL = 'http://localhost'
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Authorization': token
  }
})

axios.interceptors.request.use(config => {
  // クッキーからトークンを取り出してヘッダーに添付する
  config.headers['Authorization'] = token
  return config
}), function (error) {
    return Promise.reject(error)
}

export default axiosInstance