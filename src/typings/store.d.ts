/**
 * Created by 熊超超 on 2018/4/24.
 */
// 根state
interface State {
  common: CommonState,
  publicM: PublicState
}

// 各个module的state
// common模块
declare interface CommonState extends Model {
  menus?: Menu[],
  menuExpand?: boolean,
  selectedTab?: string,
}
// public 模块
/* tslint:disable:no-empty-interface */
declare interface PublicState {
}

declare interface Model {
  [propName: string]: any
}

// 以下是业务对象

// 菜单
declare interface Menu extends Model {
  id: string, // id
  name: string, // 菜单名称
  icon?: string, // 图标名称
  children?: Menu[] // 子菜单
}
// 用户
declare interface User extends Model {
  id?: number, // id
  userName: string, // 用户名
  password?: string
}
