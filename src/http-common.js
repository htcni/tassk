import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://task-api-service-ipjs.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Token ${localStorage.getItem(
      'authToken'
    )}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
