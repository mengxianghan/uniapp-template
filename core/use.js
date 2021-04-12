import Vue from 'vue'
import api from '@/api/index.js'

Vue.prototype.$api = api

Vue.config.errorHandler = (err, vm, info) => {
    console.error(err)
}
