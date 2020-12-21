import Vue from 'vue'
import api from '@/api/index.js'
import uView from 'uview-ui'

Vue.use(uView)

Vue.prototype.$api = api
