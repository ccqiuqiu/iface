import Vue from 'vue'
import App from './App.vue'
import store from './global/store'
import router from './global/router'
import ElementUI from 'element-ui'
import 'flex.css/dist/data-flex.css'
import './assets/css/base.scss'
import './assets/icons/icon'
import utils from './assets/utils/index'
import regComponents from './global/regComponents'
import formVerify from './global/formVerify'

Vue.use(ElementUI, { size: 'small' })
Vue.use(formVerify)

// 注册一些全局组件
Vue.use(regComponents)

Vue.config.productionTip = false
Vue.use(utils)
export default new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
