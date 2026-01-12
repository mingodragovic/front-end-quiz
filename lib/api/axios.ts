import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          throw new Error(data.message || 'Bad request. Please check your input.')
        case 401:
          throw new Error('Unauthorized. Please try again.')
        case 403:
          throw new Error('Forbidden. You do not have permission to access this resource.')
        case 404:
          throw new Error('Resource not found.')
        case 422:
          throw new Error(data.message || 'Validation error. Please check your input.')
        case 500:
          throw new Error('Server error. Please try again later.')
        default:
          throw new Error(`Error ${status}: ${data.message || 'An unexpected error occurred.'}`)
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'An unexpected error occurred.')
    }
  }
)

export default api