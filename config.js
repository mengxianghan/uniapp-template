const NODE_ENV = process.env.NODE_ENV

const config = {
    // 开发环境配置
    development: {
        api: ''
    },
    // 生产环境配置
    production: {
        api: ''
    }
}

export default config[NODE_ENV];
