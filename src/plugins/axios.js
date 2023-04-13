
import axios from "axios";

const env = import.meta.env.VITE_APP_ENV

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
    'Authorization': ''
  }
})

export default axiosInstance