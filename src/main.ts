import Vue from 'vue'
import App from './App.vue'
import router from '@g/router'
import store from '@g/store'
import ElementUI from 'element-ui'
import 'flex.css'
import './assets/css/base.scss'
import './assets/icons/icon'
import utils from '@utils/index'
import regComponents from '@g/regComponents'

Vue.use(ElementUI, {size: 'small'})

// 注册一些全局组件
Vue.use(regComponents)

if (process.env.VUE_APP_MOCK) {
  /* tslint:disable:no-var-requires */
  require('./mock/index')
}

Vue.config.productionTip = false
Vue.use(utils)
export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
