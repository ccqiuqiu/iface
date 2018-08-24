/**
 * Created by 熊超超 on 2018/5/3.
 */
import utils from './uiUtils'

export default class Constant {
  MessageType = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error'
  }

  FormItemType = {
    text: 'text',
    select: 'select',
    date: 'date',
    time: 'time',
    daterange: 'daterange',
    timerange: 'timerange',
    switch: 'switch',
    checkbox: 'checkbox',
    checkboxbutton: 'checkboxbutton',
    radio: 'radio',
    radiobutton: 'radiobutton',
    datetime: 'datetime',
    timeselect: 'timeselect',
    cascader: 'cascader',
    number: 'number',
    slider: 'slider',
    rate: 'rate',
    table: 'table',
    tree: 'tree',
    dialog: 'dialog',
    icon: 'icon',
    color: 'color',
    password: 'password',
    textarea: 'textarea'
  }
  // 状态
  StatusV = {
    禁用: 2,
    启用: 1
  }
  // 反转key-value的状态
  StatusK = null

  // 性别
  SexV = {
    男: 1,
    女: 2
  }
  // 反转key-value的性别
  SexK = null

  // 页面类型
  PageTypeV = {
    表格页面: 1,
    树页面: 2,
    表单: 9,
    CODE: 10
  }
  // 反转key-value的页面类型
  PageTypeK = null

  // DashboardType
  DashboardTypeV = {
    '信息面板': 'info',
    '列表': 'list',
    '表格': 'table',
    '图表-折线图': 'line',
    '图表-柱状图': 'histogram',
    '图表-条形图': 'bar',
    '图表-饼图': 'pie',
    '图表-环形图': 'ring',
    '图表-瀑布图': 'waterfall',
    '图表-漏斗图': 'funnel',
    '图表-雷达图': 'radar',
    '图表-地图': 'map',
    '图表-桑基图': 'sankey',
    '图表-热力图': 'heatmap',
    '图表-散点图': 'scatter',
    '图表-K线图': 'candle',
    '图表-仪表盘': 'gauge',
    '图表-树图': 'tree'
  }

  DashboardTypeK = null

  // 自定义表单组件的时候，选择类组件的数据源
  OptionsDataSource = [
    {label: '性别', value: 'sex', type: 'keyValue'},
    {label: '状态', value: 'status', type: 'keyValue'},
    {label: 'Dashboard类型', value: 'dashboardType', type: 'keyValue'},
    {label: '菜单树', value: 'menuTree', type: 'tree'},
    {label: '角色', value: 'role', type: 'table'},
    {label: '资源表格', value: 'resource', type: 'table'}
  ]
  // options是为type为keyValue的选择组件提供选项，key对应OptionsDataSource的value
  options = {
    sex: utils.objToArr(this.SexV),
    status: utils.objToArr(this.StatusV),
    dashboardType: utils.objToArr(this.DashboardTypeV),
    pageType: utils.objToArr(this.PageTypeV)
  }
  constructor () {
    this.StatusK = utils.reverse(this.StatusV)
    this.SexK = utils.reverse(this.SexV)
    this.PageTypeK = utils.reverse(this.PageTypeV)
    this.DashboardTypeK = utils.reverse(this.DashboardTypeV)
  }
}
export const constant = new Constant()
