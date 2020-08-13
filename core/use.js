import Vue from 'vue'
import api from '@/api/index.js'
import * as util from '@/utils/util.js'

window.$xy = Vue.prototype.$xy = {
    util,
    api
}
