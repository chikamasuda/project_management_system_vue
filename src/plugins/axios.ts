
import axios from "axios";
import cookie from 'vue-cookie';
import Axios, { AxiosError } from 'axios';

const env = import.meta.env.VITE_APP_ENV
const token = 'Bearer ' + cookie.get('user_token')

const axiosInstance = axios.create({
  baseURL:'http://localhost',
  headers: {
    'Accept': 'application/json',
    'Authorization': token
  }
})

axiosInstance.interceptors.request.use(config => {
  // クッキーからトークンを取り出してヘッダーに添付する
  const token = 'Bearer ' + cookie.get('user_token')
  config.headers.Authorization = `${token}`
  return config
}), function (error: AxiosError) {
    return Promise.reject(error)
}

export default axiosInstance