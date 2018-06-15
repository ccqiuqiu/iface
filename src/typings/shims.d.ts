declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare interface TT {
  [index: string]: any,
}

declare interface TableColumn {
  type?: string,
  index?: any,
  columnKey?: string,
  label?: string,
  prop?: string,
  width?: string,
  minWidth?: string,
  fixed?: string|boolean,
  renderHeader?: (h: any, obj: {column: any, $index: number}) => any,
  sortable?: string|boolean,
  sortMethod?: (a: any, b: any) => any,
  sortBy?: any,
  resizable?: boolean,
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => any,
  showOverflowTooltip?: boolean,
  align?: string,
  headerAlign?: string,
  className?: string,
  labelClassName?: string,
  selectable?: (row: any, index: number) => any,
  reserveSelection?: boolean,
  filters?: Array<{text: string, value: any}>,
  filterPlacement?: string,
  filterMultiple?: boolean,
  filterMethod?: (value: any, row: any, column: TableColumn) => any,
  filteredValue?: any[],
  renderCell?: (h: any, row: any, index: number, column: TableColumn, store: any) => any // jsx渲染
  renderFun?: string // jsx渲染的方法名
  formatFun?: string, // 格式化的方法
}

declare type FormItemType = 'text' | 'select' | 'date' | 'time' | 'daterange' | 'timerange' | 'switch' | 'checkbox'
  | 'checkboxbutton' | 'radio' | 'radiobutton' | 'datetime' | 'timeselect' | 'cascader' | 'number' | 'slider'
  | 'rate' | 'table' | 'tree' | 'dialog' | 'icon' | 'password' | 'textarea'
declare type BtnAction = 'save' | 'reset' | 'search'
declare type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
declare interface FormObject {
  name?: string, // 对象名，没有配置url的情况下，根据name生成相应的url
  model: any, // 表单绑定的对象
  props?: any, // 表单的属性
  items?: FormItem[], // 表单项
  btns?: FormBtn[], // 操作按钮
}
declare interface FormBtn {
  action: BtnAction,
  type?: BtnType, // 按钮颜色
  text?: string,
  icon?: string,
  url?: string,
}
declare interface FormItemPublic {
  placeholder?: string,
  type?: FormItemType
  verify?: any, // 表单校验配置
  props?: any, // 表单项属性，对应element相应的组件的属性
  options?: {
    columns: TableColumn[],
    rows: string| any[],
  } | string | any[], // 选项值，类似单选组、下拉选择组件的可选值
  dialog?: CRUDObject  // 用于类型为dialog的表单项
}
declare interface FormItem extends FormItemPublic {
  label: string,
  prop: string,
}
declare type targetType = 'table' | 'searchForm' | 'editForm'
declare interface CRUDItem {
  label: string,
  prop: string,
  target: string[],
  formProps: FormItemPublic,
  tableProps: TableColumn,
}
declare interface CRUDObject {
  name?: string, // 对象名，没有配置url的情况下，根据name生成相应的url
  title?: string,
  items?: CRUDItem[], // 如果表单的items和表格的columns为空，就取这里的值
  searchForm?: FormObject,
  editForm?: FormObject,
  table: {
    props?: any,
    columns: TableColumn[],
    rows: string| any[],
  },
  needQuery?: boolean, // 编辑和查看的时候，是否要先查询，如果是，会使用getUrl去查询对象
  getUrl?: '',  // 获取数据详情的url
}
declare interface OptionItem {
  label: string,
  value: string | number,
}
// 粗暴的使用没有.d.ts文件的第三方库，后期应该扩展
declare module 'v-charts/*' {
  const vChart: any
  export default vChart
}
declare module 'vue-progressbar' {
  const obj: any
  export default obj
}

declare module 'vuedraggable' {
  const vuedraggable: any
  export default vuedraggable
}
