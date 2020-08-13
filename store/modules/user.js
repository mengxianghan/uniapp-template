import storage from '@/utils/storage.js'

const state = {
    isLogin: storage.getIsLogin() || false,
    userInfo: storage.getUserInfo() || {}
}

const mutations = {
    /**
     * 设置是否登录
     */
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin
        storage.setIsLogin(isLogin)
    },
    /**
     * 设置用户信息
     */
    SET_USER_INFO(state, userInfo = {}) {
        state.userInfo = userInfo
        storage.setUserInfo(userInfo)
    }
}

const actions = {
    /**
     * 登录
     */
    login({ commit }, payload) {

    },
    logout({ commit }) {

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
