/**
 * Created by 熊超超 on 2018/4/24.
 */
//
interface ActionReturn {
  data: any,
  error: {message: string, code: number}
}
// 根state
interface State {
  common: CommonState,
  publicM: PublicState,
  system: SystemState,
  loading: boolean,
}

// 各个module的state
// common模块
declare interface CommonState extends IndexEd {
  menus?: Menu[],
  menuExpand?: boolean,
  selectedTab?: string,
  user?: User,
}
// public 模块
/* tslint:disable:no-empty-interface */
declare interface PublicState {
}
/* tslint:disable:no-empty-interface */
declare interface SystemState {
}

declare interface IndexEd {
  [propName: string]: any
}

// 以下是业务对象

// 菜单
declare interface Menu extends IndexEd {
  id: string, // id
  name: string, // 菜单名称
  icon?: string, // 图标名称
  children?: Menu[] // 子菜单
}
// 用户
declare interface User extends IndexEd {
  id?: number, // id
  userName?: string, // 用户名
  password?: string
}
