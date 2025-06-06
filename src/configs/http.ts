export default {
  api: {
    basic: import.meta.env.VITE_API_BASIC || '',
  },
  code: {
    // 忽略统一提示的错误码
    ignores: [200, 401],
    // 成功
    success: 200,
    // 未登录
    unauthorized: 401,
    // 禁止访问
    forbidden: 403,
  },
}
