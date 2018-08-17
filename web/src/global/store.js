import Vue from 'vue'
import Vuex from 'vuex'
import common from '../modules/common/vuex'
import publicM from '../modules/public/vuex'
import system from '../modules/system/vuex'
import baseData from '../modules/baseData/vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  common: {},
  publicM: {},
  system: {},
  loading: false
}
const mutations = {
  // 显示loading
  showLoading (state) {
    state.loading = true
  },
  // 隐藏loading
  hideLoading (state) {
    state.loading = true
  }
}

const actions = {
}

const modules = {
  common, publicM, system, baseData
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state) => ({
      common: {
        menus: state.common.menus,
        resources: state.common.resources,
        menuExpand: state.common.menuExpand,
        menuTabs: state.common.menuTabs,
        selectedTab: state.common.selectedTab,
        user: state.common.user,
        noMenuTabsMap: state.common.noMenuTabsMap
      }
      // home: state.home,
    })
  })]
})
