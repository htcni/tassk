import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://task-api-service-ipjs.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.url.includes('/tasks/') ||
      config.url.includes('/auth/token/logout/') ||
      config.url.includes('/auth/users/me/')
    ) {
      config.headers['Authorization'] = `Token ${localStorage.getItem(
        'authToken'
      )}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
