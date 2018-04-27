/**
 * Created by 熊超超 on 2018/4/24.
 */
/* tslint:disable */

declare namespace Store {
  // 根state
  interface State {
    common: CommonState,
    publicM: PublicState
  }
// 各个module的state
  // common模块
  interface CommonState {
    menus?: Menu[],
    menuExpand?: boolean,
    nav?: Menu
  }
  // public 模块
  interface PublicState {
  }

// 业务对象
  interface Menu {
    id: string, // id
    name: string, // 菜单名称
    icon?: string, // 图标名称
    children?: Menu[] // 子菜单
  }
  // 业务对象
  interface User {
    id?: number, // id
    userName: string, // 用户名
    password?: string
  }
}
