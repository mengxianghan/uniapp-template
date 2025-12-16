import { createHttp, type IHttpOptions } from 'uni-vant-http'
import { config } from '@/configs'
import { ResponseError } from './exception'
import { showToast } from './ui'

const options: IHttpOptions = {
  interceptorRequest: (request) => {
    return request
  },
  interceptorResponse: (response) => {
    // 错误码处理
    if (!config.includes('http.code.ignores', response.data.resultStatus)) {
      const errMsg = response.data.message || '系统异常'
      // 延迟显示提示，避免被页面的错误覆盖
      setTimeout(() => {
        showToast({
          title: errMsg,
        })
      }, 200)
      throw new ResponseError(errMsg, response.data.resultStatus)
    }

    return response
  },
}

export const basic = createHttp({
  ...options,
  baseURL: config.get('http.api.basic'),
})
