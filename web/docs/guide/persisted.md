---
title: 持久化
---

为了解决vuex在页面刷新后数据会丢失的问题，iFace引入了vuex-persistedstate库来持久化store里面的数据


* 通过给createPersistedState方法新建一个插件
* 通过reducer有选择的缓存store里面的数据
* 通过将插件配置到Store对象来实现持久化

```javascript
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state: State) => ({
      common: {
        menus: state.common.menus,
        resources: state.common.resources,
        menuExpand: state.common.menuExpand,
        menuTabs: state.common.menuTabs,
        selectedTab: state.common.selectedTab,
        user: state.common.user,
        noMenuTabsMap: state.common.noMenuTabsMap,
      },
      // home: state.home,
    }),
  })],
})
```
