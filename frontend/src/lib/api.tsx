'use client'
import axios from "axios";
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "./utils";


const api = axios.create({
   baseURL: API_URL,
})


api.interceptors.request.use(
   (config) => {
       const token = localStorage.getItem(ACCESS_TOKEN);
       if(token) config.headers.Authorization = `Bearer ${token}`
      
       return config
   },
   (error) => {
       return Promise.reject(error)
   }
)

export default api