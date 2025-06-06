import { createHttp, type IHttpOptions } from 'uni-vant-http'
import { config } from '@/configs'

const options: IHttpOptions = {
  interceptorRequest: (request) => {
    return request
  },
  interceptorResponse: (response) => {
    // 错误码处理
    if (!config.includes('http.code.ignores', response.data.resultStatus)) {
      // 延迟显示提示，避免被页面的错误覆盖
      setTimeout(() => {
        uni.showToast({
          icon: 'none',
          title: response.data.reason || '系统异常',
        })
      }, 200)
    }

    return response
  },
}

export const basic = createHttp({
  ...options,
  baseURL: config.get('http.api.basic'),
})
