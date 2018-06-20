import Vue from 'vue'
import App from './App.vue'
import router from '@g/router'
import store from '@g/store'
import ElementUI from 'element-ui'
import elementUIVerify from 'element-ui-verify'
import 'flex.css'
import './assets/css/base.scss'
import './assets/icons/icon'
import utils from '@utils/index'
import regComponents from '@g/regComponents'

Vue.use(ElementUI, {size: 'small'})
Vue.use(elementUIVerify, {
  errorMessageTemplate: {
    empty: '{alias}不能为空',
    length: '{alias}的长度不能超过{length}位',
    minLength: '{alias}的长度不能少于{minLength}位',
    number: '{alias}必须为数字',
    int: '{alias}必须为整数',
    lt: '{alias}必须为小于{lt}的数字',
    lte: '{alias}必须为不大于{lte}的数字',
    gt: '{alias}必须为大于{gt}的数字',
    gte: '{alias}必须为不小于{gte}的数字',
    maxDecimalLength: '{alias}必须为小数位不大于{maxDecimalLength}的数字',
    phone: '{alias}必须为正确的手机号',
    email: '{alias}必须为正确的邮箱',
    verifyCode: '{alias}必须为正确的验证码',
  },
})

// 注册一些全局组件
Vue.use(regComponents)

if (process.env.VUE_APP_MOCK) {
  /* tslint:disable:no-var-requires */
  require((process.env.VUE_APP_MOCK ? './mock/index' : null) as any)
}

Vue.config.productionTip = false
Vue.use(utils)
export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
