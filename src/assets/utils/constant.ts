/**
 * Created by 熊超超 on 2018/5/3.
 */
import utils from './uiUtils'

export default class Constant {
  // 状态
  public StatusV = {
    禁用: 2,
    启用: 1,
  }
// 反转key-value的状态
  public StatusK: any = null

// 性别
  public SexV = {
    男: 1,
    女: 2,
  }
// 反转key-value的性别
  public SexK: any = null

// 页面类型
  public PageTypeV = {
    页面: 1,
    表单: 2,
  }
// 反转key-value的页面类型
  public PageTypeK: any = null

// DashboardType
  public DashboardTypeV = {
    信息面板: 1,
    列表: 2,
    表格: 3,
    图表: 4,
  }

  public DashboardTypeK: any = null

// 自定义表单组件的时候，选择类组件的数据源
  public OptionsDataSource = [
    {label: '性别', value: 'sex', type: 'keyValue'},
    {label: '状态', value: 'status', type: 'keyValue'},
    {label: 'Dashboard类型', value: 'dashboardType', type: 'keyValue'},
    {label: '菜单树', value: 'menuTree', type: 'tree'},
    {label: '角色', value: 'role', type: 'table'},
    {label: '资源表格', value: 'resource', type: 'table'},
  ]
// options是为type为keyValue的选择组件提供选项，key对应OptionsDataSource的value
  public options: any = {
    sex: utils.objToArr(this.SexV),
    status: utils.objToArr(this.StatusV),
    dashboardType: utils.objToArr(this.DashboardTypeV),
    pageType: utils.objToArr(this.PageTypeV),
  }
  constructor() {
    this.StatusK = utils.reverse(this.StatusV)
    this.SexK = utils.reverse(this.SexV)
    this.PageTypeK = utils.reverse(this.PageTypeV)
    this.DashboardTypeK = utils.reverse(this.DashboardTypeV)
  }
}
export const constant = new Constant()

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
