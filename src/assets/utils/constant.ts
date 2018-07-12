/**
 * Created by 熊超超 on 2018/5/3.
 */
import {reverse} from './utils'

export const StatusV = {
  禁用: 0,
  启用: 1,
}
export const StatusK: IndexEd = reverse(StatusV)

export const SexV = {
  男: 1,
  女: 0,
}
export const SexK: IndexEd = reverse(SexV)

export const PageTypeV = {
  页面: 1,
  表单: 2,
}
export const OptionsDataSource = [
  {label: '性别', value: 'sex', type: 'keyValue'},
  {label: '状态', value: 'status', type: 'keyValue'},
  {label: '菜单树', value: 'menuTree', type: 'tree'},
  {label: '角色', value: 'role', type: 'table'},
  {label: '资源表格', value: 'resource', type: 'table'},
]
export const PageTypeK: IndexEd = reverse(PageTypeV)

export enum FormItemType {
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
}
