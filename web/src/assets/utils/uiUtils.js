/**
 * Created by 熊超超 on 2018/4/27.
 */
import store from '../../global/store'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import Utils from './utils'
import constant from './constant'

// 这个bus对象用作全局的事件总线,用于一些特殊场景下的组件通讯
const bus = new Vue()
const h = bus.$createElement

class UiUtils extends Utils {
  bus = null
  constructor () {
    super()
    this.bus = bus
  }
  // 消息框简单封装
  message (message, type = constant.MessageType.success, duration = 3000) {
    Message.closeAll()
    Message({ message, type, duration })
  }
  // alert
  alert (content, title = '提示信息', options) {
    return new Promise((resolve) => {
      MessageBox.alert(content, title, {
        type: 'info',
        ...options
      }).then(() => resolve(true)).catch(() => resolve(false))
    })
  }

  confirm (content, title = '确认操作', options) {
    return new Promise((resolve) => {
      MessageBox.confirm(content, title, {
        type: 'warning',
        ...options
      }).then(() => resolve(true)).catch(() => resolve(false))
    })
  }
  // 页面离开的时候，可以弹出提示
  async beforeRouteLeave (to, from, next, content = '有未保存的数据，确定要离开吗？') {
    // session过期的情况，直接放行，不弹提示，这个时候回调到登录页面
    if (this.isEmptyObject(store.state.common.user)) {
      next()
    }
    const re = await this.confirm(content, '确定离开')
    if (re) {
      next()
    }
  }
  // 消息框支持jsx
  msgbox (option) {
    if (option.render) {
      option.message = option.render(h)
      delete option.render
    }
    MessageBox(option)
  }

  /**
   * 显示弹窗的方法
   * @param {string} title 弹窗标题
   * @param content 弹窗内容
   * @param options // 其他选择，透传给element
   * @example
   * 简单方式：dialog('标题', '内容')
   * 弹出组件：dialog('标题', Component)
   * 弹出JSX：dialog('标题', (h) => <Component data={this.data}></Component>)
   */
  dialog (title, content, options = {}) {
    const dialog = {
      title,
      content,
      visible: true,
      options
    }
    store.commit('updateDialog', dialog)
  }
  hideDialog () {
    store.commit('hideDialog')
  }
  // 资源权限验证
  hasAuth (binding) {
    const resources = store.state.common.resources || []
    if (resources.includes('all')) {
      return true
    } else {
      return resources.includes(binding.value)
    }
  }
  toLink (url, attr, target = '_blank') {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.target = target
    if (attr) {
      for (let [key, value] of Object.entries(attr)) {
        link.setAttribute[key] = value
      }
    }
    // document.body.appendChild(link)
    link.click()
  // document.body.removeChild(link)
  }
}
const uiUtils = new UiUtils()
export default uiUtils
