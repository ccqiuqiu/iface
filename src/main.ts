import Vue from 'vue'
import App from './App.vue'
import router from './global/router'
import store from './global/store'
// import './global/registerServiceWorker
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'flex.css'
import './assets/css/base.less'

Vue.use(ElementUI)

import './assets/icons/icon'

if (process.env.VUE_APP_MOCK) {
  /* tslint:disable */
  require('./mock/index.js')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
