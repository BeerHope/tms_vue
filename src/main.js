import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang/index' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import _ from 'lodash'
import moment from 'moment'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

/* 本地mock 暂时屏蔽*/
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_BASE_URL === '/mock-api') {
  console.log('111111111111111')
  mockXHR()
}
_.assign(window, {
  _,
  moment
})
Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => {
    i18n.t(key, value)
  }
})
Vue.config.devTools = true
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
