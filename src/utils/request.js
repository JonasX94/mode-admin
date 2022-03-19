import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : '/admin/mode',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const headers = response.headers
    const res = response.data
    const url = response.config.url
    // if the custom code is not 20000, it is judged as an error.
    // console.log(res, 49)
    if (res.code !== '200' && res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '403') {
        // to re-login
        removeToken()
        router.push({ name: 'login' })
        // MessageBox.confirm('登录超时', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const jsessionid = headers.jsessionid
      const params = {
        ...res,
        jsessionid
      }
      return (url === '/mode/login' || url === '/admin/mode/login') ? params : res
    }
  }, error => {
    const { data } = error.response
    if (data.code === '403' || data.code === '401') {
      removeToken()
      router.push({ path: '/login' })
    }
    Message({
      message: data.message || '服务器异常，请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(data)
  }
)

export default service
