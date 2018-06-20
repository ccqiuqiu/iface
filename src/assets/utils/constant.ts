/**
 * Created by 熊超超 on 2018/5/3.
 */

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
// 反转对象的key-value
function reverse(source: any): any {
  const re: IndexEd = {}
  for (const key of Object.keys(source)) {
    re[source[key]] = key
  }
  return re
}
