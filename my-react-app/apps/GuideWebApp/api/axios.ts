import axios from 'axios'
// import { useRoutes } from 'react-router-dom'
import Cache, { GetInstance } from './cache'
import DSCONF from '../config/index'
function createInstance() {
  const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : DSCONF.url.host,
    // timeout: 10000,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'json',
    withCredentials: true,
    // transformRequest: [
    //   function(data) {
    //     //提交前的数据处理
    //     return data
    //   }
    // ],
    transformResponse: [
      function(data) {
        // 请求返回后的数据处理
        return JSON.parse(data)
      }
    ]
  })
  instance.interceptors.request.use(
    (config: any) => {
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response: any) => {
      if (response.config.method === 'get' && (Cache.isWhiteList(response.config.url as any) || response.config.params && response.config.params.$DS_IS_CACHE === 1) && response.data && response.data.status) {
        Cache.cacheRequest.set(
          Cache.getUrl(response.config),
          JSON.stringify(response.data)
        )
      }
      if (
        response.data == null &&
        response.config.responseType === 'json' &&
        response.request.responseText != null
      ) {
        response.data = response.request.responseText
      }
      if (response.data.status === '401') {
        // if (store.state.user_info.id) {
        //   store.commit('setRelogin', true)
        // } else {
        //   router.replace({
        //     path: '/'
        //   }) //登陆成功后跳入当前页面
        // }
        if (response.data) {
          response.data.status = false
        }
      }
      return response.data
    },
    (error: any) => {
      return Promise.reject(error.response.data)
    }
  )
  return instance
}
export default GetInstance(createInstance(), false)
