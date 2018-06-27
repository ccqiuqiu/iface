/**
 * Created by 熊超超 on 2018/4/27.
 */
import store from '@g/store'
import { Message, MessageBox } from 'element-ui'
import Vue, {CreateElement} from 'vue'
const h: CreateElement = new Vue().$createElement

import {MessageType, MyElMessageBoxOptions} from '@/typings/vue'

// 消息框简单封装
export const message = (message: string, type: boolean|MessageType = true) => {
  if (typeof type === 'string') {
    Message({message, type: (type as MessageType)})
  } else {
    Message({message, type: type ? 'success' : 'error'})
  }
}
// alert
export const alert = (content: string, title = '提示信息', options: any) => {
  return new Promise(((resolve) => {
    MessageBox.alert(content, title, {
      type: 'info',
      ...options,
    }).then(() => resolve(true)).catch(() => resolve(false))
  }))
}

export const confirm =  (content: string, title = '确认操作', options: any) => {
  return new Promise(((resolve) => {
    MessageBox.confirm(content, title, {
      type: 'warning',
      ...options,
    }).then(() => resolve(true)).catch(() => resolve(false))
  }))
}
// 消息框支持jsx
export const msgbox = (option: MyElMessageBoxOptions) => {
  if (option.render) {
    option.message = option.render(h)
    delete option.render
  }
  MessageBox(option)
}

export const dialog = (title: string, content: any, options: any = {}) => {
  const dialog = {
      title,
      content,
      visible: true,
      options,
    }
  store.commit('updateDialog', dialog)
}
export const hideDialog = () => store.commit('hideDialog')

/**
 * 跳转到tab，左侧菜单和顶部标签之外的地方跳转页面
 * @param {string} url
 */
export const toTab = (url: string, name?: string) => {
  if (url === '/' || url === '') {
    store.commit('updateSelectedTab',  '0')
    return
  }
  const flatMenu: Menu[] = store.getters.flatMenu
  const menuTabs = store.state.common.menuTabs
  // 先根据url找到要跳转的菜单对象
  const menu: Menu = flatMenu.find((m: Menu) => m.url ===  url.split('?')[0]) as Menu
  if (menu) {
    // 判断菜单是否已经在tabs里面打开了
    const item = menuTabs.find((item: any) => item.key === menu.id)
    // 没有打开，要找到菜单的层级，加到menuTabs里面，然后再跳转
    if (!item) {
      const menus: Menu[] = [menu]
      if (menu.parentId) {
        const menuParent: Menu = flatMenu.find((item: any) => item.id === menu.parentId) as Menu
        menus.unshift(menuParent)
      }
      store.commit('updateTabs', {key: menu.id, url,  menus})
    } else {
      store.commit('updateTabUrl', {item, url})
    }
    store.commit('updateSelectedTab',  menu.id)
  } else {
    const key: string = Math.floor(Math.random() * 20130306) + ''
    store.commit('updateTabs', {key, url, menus: [{name, url}]})
    store.commit('updateSelectedTab',  key)
  }
/*  // 判断url是否已经在tabs里面打开了
  const item = menuTabs.find((item: any) => item.url === url)
  if (item) {  // url已经打开，直接更新当前选择的tab
    store.commit('updateSelectedTab',  item.key)
  } else {    // 没有打开
    // 先根据url找到要跳转的菜单对象
    const arr = url.split('?')
    url = arr[0]
    const query = arr[1] || ''
    const menu: Menu = flatMenu.find((m: Menu) => m.url === url) as Menu
    if (menu) {
      // 如果存在菜单， 获取菜单父级菜单组成tab
      const menus: Menu[] = [menu]
      if (menu.parentId) {
        const menuParent: Menu = flatMenu.find((item: any) => item.id === menu.parentId) as Menu
        menus.unshift(menuParent)
      }
      store.commit('updateTabs', {key: menu.id, url,  menus})
      store.commit('updateSelectedTab',  menu.id)
    } else { // 不存在
      const key: string = Math.floor(Math.random() * 20130306) + ''
      store.commit('updateTabs', {key, url, menus: [{name, url}]})
      store.commit('updateSelectedTab',  key)
    }
  }*/
 /* // 先根据url找到要跳转的菜单对象
  const menu: Menu = flatMenu.find((m: Menu) => m.url === url) as Menu
  // 没有找到菜单
  if (!menu) {
    // 首页
    if (url === '/') {
      store.commit('updateSelectedTab',  '0')
      return
    } else {
      const key: string = Math.floor(Math.random() * 20130306) + ''
      store.commit('updateTabs', {key, url, menus: [{name, url}]})
      store.commit('updateSelectedTab',  key)
      return
    }
  }
  // if (query) {
  //   menu = JSON.parse(JSON.stringify(menu))
  //   menu.url += ('?' + query)
  // }
  // 判断菜单是否已经在tabs里面打开了
  const item = menuTabs.find((item: any) => item.key === menu.id)
  // 没有打开，要找到菜单的层级，加到menuTabs里面，然后再跳转
  if (!item) {
    const menus: Menu[] = [menu]
    if (menu.parentId) {
      const menuParent: Menu = flatMenu.find((item: any) => item.id === menu.parentId) as Menu
      menus.unshift(menuParent)
      store.commit('updateTabs', {key: menu.id, url,  menus})
    }
  }
  store.commit('updateSelectedTab',  menu.id)*/
}

export const hasAuth = (binding: any): boolean => {
  const resources: string[] = store.state.common.resources
  if (resources[0] === 'all') {
    return true
  } else {
    return !!resources.find((res: string) => binding.value.includes(res))
  }
}
