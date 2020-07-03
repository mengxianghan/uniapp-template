import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

//自动化引入modules
const modules = {}
require.context('./modules/', false, /[A-Za-z]+\.(js)$/)
    .keys()
    .forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        if (name === 'index') return
        const options = () => {
            const config = req(filename)
            return config.default || config
        }
        modules[name] = options()
    })

const store = new Vuex.Store({
    getters,
    modules
})

export default store
