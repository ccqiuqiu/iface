/**
 * Created by 熊超超 on 2018/5/3.
 */
import { utils } from './utils'

class Constant {
  // 消息类型
  MessageType = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error'
  }
  // 刷新类型
  RefreshType = {
    自动: 'auto',
    更新数据: 'getData',
    重载页面: 'reLoad',
    刷新标签: 'refresh',
  }

  // 表单item的类型
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

  MethodsV = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }

  // 是否
  YesOrNoV = {
    是: 1,
    否: 0
  }
  // 状态
  StatusV = {
    禁用: 2,
    启用: 1
  }

  // 性别
  SexV = {
    男: 1,
    女: 2
  }

  // 页面类型
  PageTypeV = {
    表格页面: 1,
    树页面: 2,
    表单: 9,
    代码: 10
  }

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
  // 菜单打开类型
  MenuOpenTypeV = {
    内部: 1,
    Iframe: 2,
    新窗口: 3
  }

  // 自定义表单组件的时候，选择类组件的数据源
  OptionsDataSource = [
    { label: '性别', value: 'sex', type: 'keyValue' },
    { label: '状态', value: 'status', type: 'keyValue' },
    { label: 'Dashboard类型', value: 'dashboardType', type: 'keyValue' },
    { label: '请求方法', value: 'methods', type: 'keyValue' },
    { label: '菜单树', value: 'menuTree', type: 'tree' },
    { label: '角色树', value: 'roleTree', type: 'tree' },
    { label: '角色表格', value: 'role', type: 'table' },
    { label: '资源表格', value: 'resource', type: 'table' },
    { label: '菜单打开类型', value: 'menuOpenType', type: 'keyValue' },
    { label: '是否', value: 'yesOrNo', type: 'keyValue' },
  ]
  // options是为type为keyValue的选择组件提供选项，key对应OptionsDataSource的value
  options = {}
  constructor () {
    // 将以V开头的属性增加一个k和v反转的对象，并且转为label和value的数组放到options里面
    for (let [k] of Object.entries(this)) {
      if (k.endsWith('V')) {
        const name = k.substr(0, k.length - 1)
        this[name + 'K'] = utils.reverse(this[k])
        this.options[name.substr(0, 1).toLowerCase() + name.substr(1)] = utils.objToArr(this[k])
      }
    }
  }
}
const constant = new Constant()
console.log(constant)
export default constant
