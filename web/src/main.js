import Vue from 'vue'
import App from './App.vue'
import router from './global/router'
import store from './global/store'
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

// mock模式下启动的时候，导入mock数据
if (process.env.VUE_APP_MOCK) {
  /* tslint:disable:no-var-requires */
  // 这里在非mock模式下导入vue并没有任何意义仅仅是为了让编译器不出现警告，因为require参数必须是字符串
  require(process.env.VUE_APP_MOCK ? './record/mock.js' : 'vue')
}

Vue.config.productionTip = false
Vue.use(utils)
export default new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
