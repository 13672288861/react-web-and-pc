import wx from 'weixin-js-sdk'
// 跳转页面
function navigateTo(options: any) {
  wx.miniProgram.navigateTo(options)
}

export function miniappApi(action = '', options = {}) {
  switch (action) {
    case 'navigateTo':
      navigateTo(options)
      break
  }
}

export function isMiniapp() {
  return new Promise((resolve) => {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger' as any) {
      wx.miniProgram.getEnv(function(res:any) {
        resolve(res.miniprogram)
      })
    } else {
      resolve(false)
    }
  })
}
