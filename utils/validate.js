import store from '@/store/index.js';

/**
 * 是否登录
 */
export function isLogin() {
    const {
        isLogin
    } = store.getters.isLogin
    return isLogin
}
