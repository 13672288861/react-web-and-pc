import pxtovw from 'postcss-px-to-viewport'
import HOSPKEY from './hosp_key'
const HOSP_KEY: string = process.argv.find((v) => v.includes('--HOSP_KEY'))?.split('=')[1]
export function AntdMobileResolve() {
  return {
    libraryName: 'antd-mobile',
    esModule: true,
    resolveStyle: (name) => {
      return `antd-mobile/es/${name}/style/index`
    }
  }
}
export function hospHostReplace() {
  return {
    name: 'vite-diff-dshost',
    transform(code, id) {
      if (id.includes('apps/GuideWebApp/config/index.ts') && HOSP_KEY) { // 替换显示环境host
        code = code.replace('localhost:8080', HOSPKEY[HOSP_KEY])
      }
      return code
    }
  }
}
export const HOSPITAL_KEY = {
  JDSY: ''
}
const _result:any = {
  css_result_plugin: []
}
if (!process.argv.includes('DSPC')) { // 区分pc端 手机端
  const loder_pxtovw = pxtovw({
    viewportWidth: 750,
    viewportUnit: 'vw'
  })
  _result.css_result_plugin.push(loder_pxtovw)
}
export default _result
