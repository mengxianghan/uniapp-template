const NODE_ENV = process.env.NODE_ENV

const config = {
    // 开发环境配置
    development: {
        baseUrl: ''
    },
    // 生产环境配置
    production: {
        baseUrl: ''
    }
}

export default config[NODE_ENV];
