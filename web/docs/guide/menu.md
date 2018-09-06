---
title: 路由和菜单
---

路由和菜单是组织起一个后台应用的关键骨架。iFace的菜单是通过用户权限从后端获得。而为了实现动态路由的加载以及模块化，并没有通过菜单动态生成路由，而是额外要配置一份路由数据。这样导致配置略微繁琐，但是能更灵活的配置路由的异步加载等特性。

## 路由配置
iFace的路由配置主要分布在2个地方，路由对象的导出位于```/src/global/router.ts```， 各个模块的路由配置位于模块跟目录下的```router.ts```

::: tip TIP
common模块的路由组件是同步加载，而其他模块是异步加载
:::

## 菜单配置
iFace的菜单系统主要由以下几个全局的状态控制
```js
menus: Menu[], // 左侧菜单
menuExpand: boolean, // 左侧菜单是否展开
menuTabs: // tab页数组
selectedTab: '0', // 当前激活的tab
​
// 以下2个是getter
nav: Menu[] // 面包屑导航数组
flatMenu: Menu[] // 打平的菜单数组，只有一个层级，只要用于菜单的一些查找操作
```

## 左侧菜单
- iFace的菜单包含如下属性
```js
{
    id: string, // id
    name: string, // 菜单名称
    url?: string, // 跳转的url
    icon?: string, // 图标名称
    children?: Menu[] // 子菜单
}
```

- iFace默认最多支持2级菜单，如果需要增加菜单层级，可以修改```/src/modules/common/view/MenuView.vue```文件实现
- 一级菜单显示自定义的图标，二级菜单默认显示固定的图标，如果需要二级菜单也能显示自定义图标，请修改```src/modules/common/view/MenuView.vue```如下代码
```html
<el-menu-item v-for="menu2 in menu.children" :index="menu2.id" :key="menu2.id" :route="{path: menu2.url}">
  <template slot="title">
    - <cc-icon name="ring" size="14"></cc-icon>
    + <cc-icon :name="menu2.icon" size="14"></cc-icon>
    <span slot="title" class="m-l-5">{{menu2.name}}</span>
  </template>
</el-menu-item>
```

## 面包屑导航
iFace的面包屑导航事实上是一个由当前菜单及其父级菜单组成的一个数组（nav），这是一个计算属性，依赖当前选中的菜单。

## tab页
tabs页同样是一个数组（tabs），但这个数组比面包屑要复杂，数据结构大致如下：
```js
{
  key: string,  // tab的key，一般是menus最后一个菜单的id
  url: string,  // tab的key，一般是menus最后一个菜单的url
  menus: Menu[], // 菜单数组，对应面包屑导航对象nav
}
```

## 菜单联动
左侧菜单、面包屑、tab页并不是孤立存在的，他们相互之前会有联动效果，也就是说，一个对象的改变会引起其他对象的相应变化。系统统一了整个联动的过程，也就是说，所有的改动，将通过路由的变化来完成。

- 点击左侧菜单，跳转路由，触发watch  ->  tabs改变，nav改变，selectedTab改变
- 点击tab页，跳转路由，触发watch， ->  tabs改变，nav改变，selectedTab改变


## 路由钩子
由于使用了基于类的组件开发，默认情况下，路由的钩子函数不能触发的，如果需要使用路由的钩子函数，要先进行注册。例如```/src/modules/common/view/Home.vue​```
```js
Component.registerHooks(['beforeRouteLeave'])
```