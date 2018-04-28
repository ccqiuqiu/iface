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
interface CommonState {
  menus?: Menu[],
  menuExpand?: boolean,
  nav?: Menu[]
}
// public 模块
/* tslint:disable:no-empty-interface */
interface PublicState {
}

interface Model {
  [propName: string]: any
}
// 业务对象
interface Menu extends Model {
  id: string, // id
  name: string, // 菜单名称
  icon?: string, // 图标名称
  children?: Menu[] // 子菜单
}
// 业务对象
interface User extends Model {
  id?: number, // id
  userName: string, // 用户名
  password?: string
}
