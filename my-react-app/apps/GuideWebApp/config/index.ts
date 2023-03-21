import { isObject } from '../static/js/public'
const ENV = {
  HOSP_KEY: 'LYJ'
}
// 基础配置
const baseConf = {
  page_info: {
    title: 'PC系统'
  },
  url: {
    host: 'localhost:8080',
    root_path: window.location.origin + window.location.pathname
  },
  theme: {
    primary: '#17C0AE',
    tip: '#FF8A16 ',
    warning: '#FB4027',
    fontBlack: '#0C0D0D',
    colorVip: '#4C371A'
  }
}
// 医院自定义配置
const customConf: any = {
  LYJ: {}
}

// 合并自定义配置和基础配置
const conf = JSON.parse(JSON.stringify(baseConf))
if (ENV && ENV.HOSP_KEY && customConf[ENV.HOSP_KEY]) {
  const currCustomConf = customConf[ENV.HOSP_KEY]
  if (currCustomConf) {
    for (const ckey in currCustomConf) {
      if (isObject(conf[ckey]) && isObject(currCustomConf[ckey])) {
        Object.assign(conf[ckey], currCustomConf[ckey])
      } else {
        conf[ckey] = currCustomConf[ckey]
      }
    }
  }
}

// 冻结所有对象属性不可写
function deepFreeze(obj: any) {
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(function(name) {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null) { deepFreeze(prop) }
  })
  return Object.freeze(obj)
}
deepFreeze(conf)
export default conf
