---
title: 模块
---

iFace使用模块来组织代码，通过vue-rourer的异步加载和webpack的分块，将项目按照模块拆分，减少首屏加载的文件大小，优化用户体验。

## 目录结构

一个模块目录结构如下

```
│   │   ├─ common               // common模块
│   │   │   ├─ fragment         // .vue片段片段目录
│   │   │   │   └─ *.vue        // .vue片段文件，主要用于细化组件
│   │   │   ├─ view             // 组件目录
│   │   │   │   └─ *.vue        // .vue组件，一般是对应路由的component或者是完整的page
│   │   │   ├─ router.ts        // 模块的router
│   │   │   └─ vuex.ts          // 模块的vuex(store、action、mutations等)
```

## 增加一个模块
- 按照上面的目录结构建好相应的文件
- 配置好模块的路由
```js
import { AsyncComponent } from 'vue'
// 注意下面webpackChunkName后面的"public", 相同webpackChunkName的组件会被打包到同一个js文件里面
const Login: AsyncComponent = (): any => import(/* webpackChunkName: "public" */ './view/Login.vue')
​
export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]
```

- 编写模块的vuex代码
```js
import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'
​
const state: PublicState = {
}
const mutations: MutationTree<any> = {
}
​
const actions: ActionTree<any, any> = {
  // 用户登录
  login(context: ActionContext<CommonState, State>, user: User): Promise<any> {
     return api.login(user)
  },
}
​
export default {state, mutations, actions}
```

- 在全局router和全局store里面添加模块的router和vuex，如下面的system模块
```js{1,14,28,32}
// router
import system from '../modules/system/router'
​
Vue.use(Router)
​
const router = new Router({
  routes: [
    ...publicRouter,
    {
      path: '/',
      component: MainLayout,
      children: [
        ...common,
        ...system,
        ...demo,
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
​
export default router

// vuex
import system from '../modules/system/vuex'
Vue.use(Vuex)
​
const modules: ModuleTree<any> = {
  common, publicM, system,
}
​
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
})
```

::: warning 注意事项
- 注意配置异步组件的webpackChunkName
- 模块间公用的组件和状态放在common模块
- common模块的有些组件可以根据使用频率和优先级等情况决定是否异步加载
- 可以将多个较小模块设置相同的webpackChunkName以合并为同一个js文件
:::