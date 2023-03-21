import { stringify } from 'qs'
import { getRequestParams } from '../static/js/public'
// $DS_IS_CACHE == 1 请求的第三个参数里面加上就缓存
export function GetInstance($http: object, DS_IS_CACHE: boolean) {
  const context: any = new Cache($http, DS_IS_CACHE)
  const instance = context.get.bind(context)
  const keys: string[] = ['get', 'getKey', 'post', 'delete', 'put', 'all', 'spread', '$http', 'DS_IS_CACHE']
  keys.forEach((key:string) => {
    instance[key] = context[key]
  })
  return instance
}
export default class Cache {
  static whiteList = []
  DS_IS_CACHE = false
  $http:any = {}
  static cacheRequest = new Map()
  constructor($http: object, DS_IS_CACHE: boolean) {
    this.$http = $http
    this.DS_IS_CACHE = DS_IS_CACHE
  }
  static isWhiteList(url:string) {
    url = (url.includes('http') ? new URL(url).pathname : url).split('?')[0]
    // '#/manager/cfg/par_cfg' 参数配置不取缓存
    return Cache.whiteList.includes(url as never) && location.hash !== '#/manager/cfg/par_cfg'
  }
  static getUrl(config: any) {
    const params = config.params ? config.params : {}
    const theRequest = getRequestParams(config.url)
    const transform = Object.assign(params, theRequest)
    const url = config.url.split('?')[0] + '?' + stringify(transform)
    if (config.method === 'get') {
      return [config.method, decodeURIComponent(url)].join('&')
    }
    return [config.method, decodeURIComponent(config.url)].join('&')
  }
  getKey(arr: any[]) {
    const key = Cache.getUrl({
      method: 'get',
      url: (process.env.NODE_ENV === 'development' ? '' : DSCONF.url.host) + arr[0],
      params: arr[1] ? arr[1].params : {}
    })
    return key
  }
  get(...arg: any[]) { // 这个函数的this指向 zai 直接调用的时候改变了
    const key = this.getKey(Array.from(arg))
    const cacheData = Cache.cacheRequest.get(key)
    if (this?.DS_IS_CACHE && cacheData && (Cache.isWhiteList(arg[0]) || arg[1] && arg[1].params.$DS_IS_CACHE === 1)) {
      // 命中缓存
      return new Promise((re) => {
        setTimeout(() => {
          re(JSON.parse(cacheData))
        }, 100)
      })
    } else {
      Cache.cacheRequest.delete(key)
      return this.$http.get(...arg)
    }
  }
  post(...arg: any[]) {
    return this.$http.post(...arg)
  }
  delete(...arg: any[]) {
    return this.$http.delete(...arg)
  }
  put(...arg: any[]) {
    return this.$http.put(...arg)
  }
  all(...arg: any[]) {
    return this.$http.all(...arg)
  }
  spread(...arg: any[]) {
    return this.$http.spread(...arg)
  }
}

