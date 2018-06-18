/**
 * Created by 熊超超 on 2018/4/27.
 */
import store from '@g/store'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'

const h = new Vue().$createElement

// 消息框简单封装
export const message = (message, type = true) => {
  if (typeof type === 'string') {
    Message({message, type})
  } else {
    Message({message, type: type ? 'success' : 'error'})
  }
}
// alert
export const alert = (content, title = '提示信息', options) => {
  return new Promise((resolve) => {
    MessageBox.alert(content, title, {
      type: 'info',
      ...options
    }).then(() => resolve(true)).catch(() => resolve(false))
  })
}

export const confirm = (content, title = '确认操作', options) => {
  return new Promise((resolve) => {
    MessageBox.confirm(content, title, {
      type: 'warning',
      ...options
    }).then(() => resolve(true)).catch(() => resolve(false))
  })
}
// 消息框支持jsx
export const msgbox = (option) => {
  if (option.render) {
    option.message = option.render(h)
    delete option.render
  }
  MessageBox(option)
}

export const dialog = (title, content, options = {}) => {
  const dialog = {
    title,
    content,
    visible: true,
    options
  }
  store.commit('updateDialog', dialog)
}
export const hideDialog = () => store.commit('hideDialog')

/**
 * 跳转到tab，左侧菜单和顶部标签之外的地方跳转页面
 * @param {string} url
 */
export const toTab = (url) => {
  const flatMenu = store.getters.flatMenu
  const menuTabs = store.state.common.menuTabs
  // 先根据url找到要跳转的菜单对象
  const menu = flatMenu.find((m) => m.url === url)
  // 没有找到菜单说明是首页
  if (!menu) {
    store.commit('updateSelectedTab', '0')
    return
  }
  // 判断菜单是否已经在tabs里面打开了
  const item = menuTabs.find((item) => item.key === menu.id)
  // 没有打开，要找到菜单的层级，加到menuTabs里面，然后再跳转
  if (!item) {
    const menus = [menu]
    if (menu.parentId) {
      const menuParent = flatMenu.find((item) => item.id === menu.parentId)
      menus.unshift(menuParent)
      store.commit('updateTabs', {key: menu.id, menus})
    }
  }
  store.commit('updateSelectedTab', menu.id)
}

export const hasAuth = (binding) => {
  const resources = store.state.common.resources
  if (resources[0] === 'all') {
    return true
  } else {
    return !!resources.find((res) => binding.value.includes(res))
  }
}
