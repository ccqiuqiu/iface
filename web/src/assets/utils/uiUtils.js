/**
 * Created by 熊超超 on 2018/4/27.
 */
import store from '../../global/store'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import Utils from './utils'
import router from '../../global/router'

const bus = new Vue()
const h = bus.$createElement

export class UiUtils extends Utils {
  bus = null
  constructor () {
    super()
    this.bus = bus
  }
  // 消息框简单封装
  message (message, type = true) {
    if (typeof type === 'string') {
      Message({message, type})
    } else {
      Message({message, type: type ? 'success' : 'error'})
    }
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

  /**
   * 跳转到tab，左侧菜单和顶部标签之外的地方跳转页面
   * @param {string} url
   */

  toTab (url, name = '', refresh) {
    if (url === '/' || url === '') {
      store.commit('updateSelectedTab', '0')
      return
    }
    const flatMenu = store.getters.flatMenu
    const menuTabs = store.state.common.menuTabs
    // 先根据url找到要跳转的菜单对象
    const menu = flatMenu.find((m) => m.url === url.split('?')[0])
    let key = ''
    if (menu) {
      key = menu.id
      // 判断菜单是否已经在tabs里面打开了
      const item = menuTabs.find((item) => item.key === key)
      // 没有打开，要找到菜单的层级，加到menuTabs里面，然后再跳转
      if (!item) {
        const menus = [menu]
        if (menu.parentId) {
          const menuParent = flatMenu.find((item) => item.id === menu.parentId)
          menus.unshift(menuParent)
        }
        store.commit('updateTabs', {key, url, menus})
      } else {
        store.commit('updateTabUrl', {item, url})
      }
      store.commit('updateSelectedTab', key)
    } else {
      const noMenuTabsMap = store.state.common.noMenuTabsMap
      const noMenuTabsMapReverse = this.reverse(noMenuTabsMap)
      key = noMenuTabsMapReverse[url]
      if (key) {
        store.commit('updateSelectedTab', key)
      } else {
        key = Math.floor(Math.random() * 20130306) + ''
        store.commit('updateTabs', {key, url, menus: [{name, url}]})
        store.commit('updateSelectedTab', key)
        noMenuTabsMap[key] = url
      }
    }
    // 跳转一下页面
    router.push(url)
    refresh && bus.$emit('refresh', key)
  }

  closeTab (url, refresh) {
    this.removeTab(store.state.common.selectedTab)
    if (url) {
      this.toTab(url, '', refresh)
    }
  }
  removeTab (key) {
    bus.$emit('remove', key)
    store.commit('removeTab', key)
  }
  removeTabs (command) {
    const oldKeys = store.state.common.menuTabs.map(item => item.key)
    store.commit('removeTabs', command)
    const newKeys = store.state.common.menuTabs.map(item => item.key)
    const delKeys = oldKeys.filter(item => !newKeys.includes(item))
    delKeys.forEach(key => bus.$emit('remove', key))
  }

  hasAuth (binding) {
    const resources = store.state.common.resources
    if (resources === 'all') {
      return true
    } else {
      return resources.includes(binding.value)
    }
  }

  destroyAndRemoveCache (component) {
    // 先删掉缓存
    if (component.$vnode.parent && component.$vnode.parent.componentInstance) {
      const key = component.$vnode.componentOptions.Ctor.cid
      const cache = component.$vnode.parent.componentInstance.cache
      const keys = component.$vnode.parent.componentInstance.keys
      delete cache[key]
      const index = keys.findIndex(item => item === key)
      keys.splice(index, 1)
      // 再销毁组件
      component.$destroy()
    }
  }
}

export default new UiUtils()
