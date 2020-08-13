import _ from 'lodash'

let api = {}
const register = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        const options = () => {
            const config = req(filename)
            return config.default || config
        }
        let data
        let nameArr = name.split('/')
        if (nameArr.length > 1) {
            data = name.split('/').reduceRight((accumulator, currentValue) => ({[currentValue]: {[accumulator]: options()}}))
        } else {
            data = {[name]: options()}
        }
        api = _.merge(api, data)
    })
}

register(require.context('./modules', true, /[A-Za-z]+\.(js)$/))

export default api
