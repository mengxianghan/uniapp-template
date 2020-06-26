import qs from 'qs'
import store from '@/store/index.js';
import config from '@/config.js'

// #ifdef H5
const Fly = require('flyio/dist/npm/fly')
// #endif

// #ifdef MP-ALIPAY
const Fly = require("flyio/dist/npm/ap")
// #endif

// #ifdef MP-WEIXIN || APP-PLUS
const Fly = require("flyio/dist/npm/wx")
// #endif

const fly = new Fly()

// 请求拦截器
fly.interceptors.request.use((request) => {
    const isLogin = store.getters.isLogin;
    const userInfo = store.getters.userInfo;
    const token = store.getters.token;

    // post 方式发送数据，添加额外参数
    if (request.method.toLowerCase() == 'post') {
        if (isLogin) {
            request.body = {
                ...request.body,
                Token: token,
                UserId: userInfo.userId
            }
        }
    }

    return request;
});

// 响应拦截器
fly.interceptors.response.use(
    (response) => {
        if (response.data) {
            if (response.data instanceof String) {
                response.data = JSON.parse(response.data)
            }
            // #ifdef H5
            //response.data = JSON.parse(response.data);
            // #endif
            if (!response.data.IsSuccess && response.data.Message) {
                wx.showToast({
                    title: `${response.data.Message}`,
                    icon: 'none'
                });
            }
        }
        return response;
    },
    (err) => {
        const title = err.response && err.response.data ? (err.response.data.Message || '系统异常！请稍后再再试') :
            '系统异常！请稍后再再试';
        wx.showToast({
            title: title,
            icon: 'none'
        });
    }
);

class Http {
    constructor(options = {}) {
        this.baseURL = options.baseURL
        this.config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            ...options
        }
    }

    request(url = '', params = {}, options) {
        return new Promise((resolve, reject) => {
            fly.request(url, params, {
                ...this.config,
                ...options
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        });
    }

    /**
     * GET
     */
    get(url = '', params = {}, options = {}) {
        return this.request(url, params, {
            method: 'get',
            ...options
        })
    }

    /**
     * POST
     */
    post(url = '', params = {}, options = {}) {
        return this.request(url, params, {
            method: 'post',
            ...options
        })
    }

    /**
     * 上传
     */
    upload(url, data = {
        name: '',
        filePath: '',
        formData: {}
    }, options = {}) {
        const isLogin = store.getters.isLogin;
        const userInfo = store.getters.userInfo;
        const token = store.getters.token;
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: (options.baseURL || this.baseURL) + url,
                name: data.name,
                filePath: data.filePath,
                formData: {
                    ...data.formData,
                    Token: token
                },
                success: (res) => {
                    resolve(JSON.parse(res.data || '{}'));
                },
                fail: (err) => {
                    wx.showToast({
                        title: '系统异常！请稍后再试',
                        icon: 'none'
                    });
                    reject(err);
                },
                complete: () => {
                    resolve('complete');
                }
            });
        });
    }
}

class Api extends Http {
    constructor(getway = '') {
        super({
            baseURL: `${config.baseUrl}${getway}`
        })
    }
}

export default {
    api: new Api()
}
