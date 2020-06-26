import Vue from 'vue'
import api from '@/api'
import * as util from '@/utils/util'

window.$xy = Vue.prototype.$xy = {
    util,
    api
}
