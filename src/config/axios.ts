import a, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const axios = a.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     console.log('interceptors', config)
//     return config
//   },
//   function (error) {
//     console.log('req err', error)
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: AxiosError) {
    const errorResponse = error.response

    // return {
    //   ok: false,
    //   code: error.code,
    //   message: error.message
    // }
    // // Any status codes that falls outside the range of 2xx cause this function to trigger
    // // Do something with response error
    // return Promise.reject(error)
    return errorResponse ? errorResponse : error
  }
)
