export function getRequestParams(url: string) {
  const theRequest: { [key: (number | string | symbol)]: any } = {}
  if (url.indexOf('?') !== -1) {
    const strs = url.substr(1).split('?')[1].split('&')
    for (let i = 0; i < strs.length; i++) {
      const index = strs[i].indexOf('=')
      theRequest[strs[i].substr(0, index)] = unescape(strs[i].substr(index + 1))
    }
  }
  return theRequest
}
// 是否是object对象
export const isObject = (d:any) => {
  return baseTypeOf(d) === 'object'
}
/**
 * @description: 获取数据归属类型
 * @param {*} d 需要判断类型的任何值
 * @return {string} 值的类型（全小写）
 */
export const baseTypeOf = (d:any) => {
  return Object.prototype.toString.call(d).slice(8, -1).toLocaleLowerCase()
}

/*
时间格式化
参数：time ->number类型的时间戳
      type->string类型：
      {
        'y-m-d h:m:s':'2018-8-20 11:43:25',
        'y-m-d h:m'  :'2018-8-20 11:43',
        'y-m-d'      :'2018-8-20',
        'y/m/d h:m:s':'2018/8/20 11:43:25',
        'y/m/d h:m'  :'2018/8/20 11:43',
        'y/m/d'      :'2018/8/20',
      }
*/
export const formatTime = (time: string | number | Date | null | undefined, type: any) => {
  if (time === '' || time === null || time === undefined) {
    return time
  }
  if (typeof time === 'string') {
    time = Number(time)
  }
  let sign = ''
  if (type) {
    sign = type && type.indexOf('/') > -1 ? '/' : '-'
    type = type.split(' ')
  } else {
    sign = '-'
    type = []
  }
  const date = new Date(time)
  const y = date.getFullYear()
  const m =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  if (type.length === 2) {
    const hms = type[1].split(':')
    if (hms.length === 1) {
      return y + sign + m + sign + d + ' ' + h
    } else if (hms.length === 2) {
      return y + sign + m + sign + d + ' ' + h + ':' + minutes
    } else {
      return y + sign + m + sign + d + ' ' + h + ':' + minutes + ':' + s
    }
  } else {
    return y + sign + m + sign + d
  }
}
