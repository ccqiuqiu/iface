/**
 * Created by 熊超超 on 2018/5/3.
 */
import {reverse, objToArr} from './utils'

// 状态
export const StatusV = {
  禁用: 0,
  启用: 1,
}
// 反转key-value的状态
export const StatusK: IndexEd = reverse(StatusV)

// 性别
export const SexV = {
  男: 1,
  女: 0,
}
// 反转key-value的性别
export const SexK: IndexEd = reverse(SexV)

// 页面类型
export const PageTypeV = {
  页面: 1,
  表单: 2,
}
// 反转key-value的页面类型
export const PageTypeK: IndexEd = reverse(PageTypeV)

export const enum DashboardType {
  信息面板 = 1,
  列表 = 2,
  表格 = 3,
  图表 = 4,
}
// DashboardType
export const DashboardTypeV = {
  信息面板: DashboardType.信息面板,
  列表: DashboardType.列表,
  表格: DashboardType.表格,
  图表: DashboardType.图表,
}

export const DashboardTypeK: IndexEd = reverse(DashboardTypeV)

// 自定义表单组件的时候，选择类组件的数据源
export const OptionsDataSource = [
  {label: '性别', value: 'sex', type: 'keyValue'},
  {label: '状态', value: 'status', type: 'keyValue'},
  {label: 'Dashboard类型', value: 'dashboardType', type: 'keyValue'},
  {label: '菜单树', value: 'menuTree', type: 'tree'},
  {label: '角色', value: 'role', type: 'table'},
  {label: '资源表格', value: 'resource', type: 'table'},
]
// options是为type为keyValue的选择组件提供选项，key对应OptionsDataSource的value
export const options = {
  sex: objToArr(SexV),
  status: objToArr(StatusV),
  dashboardType: objToArr(DashboardTypeV),
  pageType: objToArr(PageTypeV),
}

/*export enum FormItemType {
  text = 'text',
  select = 'select',
  date = 'date',
  time = 'time',
  daterange = 'daterange',
  timerange = 'timerange',
  switch = 'switch',
  checkbox = 'checkbox',
  checkboxbutton = 'checkboxbutton',
  radio = 'radio',
  radiobutton = 'radiobutton',
  datetime = 'datetime',
  timeselect = 'timeselect',
  cascader = 'cascader',
  number = 'number',
  slider = 'slider',
  rate = 'rate',
}*/
