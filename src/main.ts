import Vue from 'vue'
import App from './App.vue'
import router from '@g/router'
import store from '@g/store'
import ElementUI from 'element-ui'
import 'flex.css'
import './assets/css/base.scss'
import './assets/icons/icon'
import utils from '@utils/index'

Vue.use(ElementUI, {size: 'small'})

// 注册一些全局组件
import CcTable from './baseComponent/CcTable.vue'
import CcButton from './baseComponent/CcButton.vue'
Vue.component('cc-table', CcTable)
Vue.component('cc-button', CcButton)

if (process.env.VUE_APP_MOCK) {
  /* tslint:disable:no-var-requires */
  require('./mock/index.js')
}

Vue.config.productionTip = false
Vue.use(utils)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
