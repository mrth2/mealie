import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Add request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can add auth tokens or other headers here
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
