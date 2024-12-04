/**
 * 工具方法
 */

import qs from 'query-string'

// 是否为移动端设备
export function isMobile() {
  let userAgent = navigator.userAgent;
  return /android|avantgo|blackberry|iemobile|ipad|iphone|ipod|opera mini|opera mobi|palm|pocket|psp|series(4|6)0|symbian|windows ce|windows phone|xda|xiino/i.test(userAgent)
}

export type ParamsType = Record<string, unknown>

export function getUrlParams(): ParamsType {
  const params = qs.parseUrl(window.location.href).query
  const returnParams: ParamsType = {}
  Object.keys(params).forEach(p => {
    if (params[p] === 'true') {
      returnParams[p] = true
    } else if (params[p] === 'false') {
      returnParams[p] = false
    } else {
      returnParams[p] = params[p]
    }
  })
  return returnParams
}
