import _ from 'lodash'

let api = {}
const registerApi = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        if (name === 'index') return
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

registerApi(require.context('./modules', true, /[A-Za-z]+\.(js)$/))

export default api
