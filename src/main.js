import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang/index'
import '@/styles/index.scss' // global css
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import moment from 'moment'
import '@/icons' // icon
import '@/permission'



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

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
