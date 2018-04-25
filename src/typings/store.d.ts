/**
 * Created by 熊超超 on 2018/4/24.
 */
// 根state
declare interface State {
  common: CommonState
}

// 各个module的state
declare interface CommonState {
  menus?: Menu[]
}

// 业务对象
declare interface Menu {
  id: number, // id
  name: string, // 菜单名称
  icon?: string, // 图标名称
  children?: Menu[] // 子菜单
}
