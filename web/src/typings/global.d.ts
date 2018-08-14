/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {ElMessageBox, ElMessageBoxOptions, MessageBoxData} from 'element-ui/types/message-box'
import {Vue} from 'vue/types/vue'
import {VNode} from 'vue'
import Constant from '@utils/constant'
import {UiUtils} from '@utils/uiUtils'
import {LsUtils} from '@utils/lsUtils'
import {DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition} from 'vue/types/options'
import {FormItemTypeEnum} from '@utils/enums'

// 给Vue组件原型上增加的方法定义类型
declare module 'vue/types/vue' {
  interface Vue {
    $utils: UiUtils,
    $c: Constant,
    $ls: LsUtils,
    [propName: string]: any
  }
}

// JSX使用大写字母开头的自定义的组件时，自定义的属性和方法会报类似这样的异常 Property 'user' does not exist on type 'ComponentOptions<Vue, DefaultData<Vue>..'
// 所以扩展ComponentOptions接口支持任意的属性和方法
declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps> {
    [propName: string]: any
  }
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface TT {
    [index: string]: any,
  }

  interface IndexEd {
    [propName: string]: any
  }
  type FormItemType = FormItemTypeEnum.text | FormItemTypeEnum.select | FormItemTypeEnum.date | FormItemTypeEnum.time
    | FormItemTypeEnum.daterange | FormItemTypeEnum.timerange | FormItemTypeEnum.switch | FormItemTypeEnum.checkbox
    | FormItemTypeEnum.checkboxbutton | FormItemTypeEnum.radio | FormItemTypeEnum.radiobutton | FormItemTypeEnum.datetime
    | FormItemTypeEnum.timeselect | FormItemTypeEnum.cascader | FormItemTypeEnum.number | FormItemTypeEnum.slider
    | FormItemTypeEnum.rate | FormItemTypeEnum.table | FormItemTypeEnum.tree | FormItemTypeEnum.dialog | FormItemTypeEnum.icon
    | FormItemTypeEnum.color | FormItemTypeEnum.password | FormItemTypeEnum.textarea
  type BtnAction = 'save' | 'reset' | 'search'
  type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

  interface MyElMessageBox extends ElMessageBox {
    (options: MyElMessageBoxOptions): Promise<MessageBoxData>
  }
  interface MyElMessageBoxOptions extends ElMessageBoxOptions {
    render?: (h: any) => any
  }

  interface TableColumn {
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
    renderCell?: (h: any, value: any, row: any, index: number, column: TableColumn, store: any) => any // jsx渲染
    renderFun?: string // jsx渲染的方法名
    formatFun?: string, // 格式化的方法
    formProps?: FormItemPublic
  }

  interface FormObject {
    name?: string, // 对象名，没有配置url的情况下，根据name生成相应的url
    model: any, // 表单绑定的对象
    props?: any, // 表单的属性
    items?: FormItem[], // 表单项
    btns?: FormBtn[], // 操作按钮
  }
  interface FormBtn {
    action: BtnAction,
    type?: BtnType, // 按钮颜色
    text?: string,
    icon?: string,
    url?: string,
    cb?: any,
  }
  interface FormItemPublic {
    placeholder?: string,
    type?: FormItemType
    verify?: any, // 表单校验配置
    props?: any, // 表单项属性，对应element相应的组件的属性
    options?: {
      columns: TableColumn[],
      rows: string| any[],
    } | string | any[] | CRUDObject, // 选项值，类似单选组、下拉选择组件的可选值
    [prop: string]: any,
  }
  interface FormItem extends FormItemPublic {
    label: string,
    prop: string,
  }

  interface CRUDItem {
    label: string,
    prop: string,
    target: string[],
    formProps: FormItemPublic,
    tableProps: TableColumn,
  }
  interface CRUDObject {
    name?: string, // 对象名，没有配置url的情况下，根据name生成相应的url
    title?: string,
    items?: CRUDItem[], // 如果表单的items和表格的columns为空，就取这里的值
    searchForm?: FormObject,
    editForm?: FormObject,
    table: {
      props?: any,
      columns: TableColumn[],
      rows: string| any[],
    }
  }
  interface OptionItem {
    label: string,
    value: string | number,
  }
  interface ActionReturn {
    data: any,
    error: {message: string, code: number}
  }

  /* store相关 */

  // 根state
  interface State {
    common: CommonState,
    publicM: PublicState,
    system: SystemState,
    loading: boolean,
  }
// 各个module的state
// common模块
  interface CommonState extends IndexEd {
    menus?: Menu[],
    resources?: string[] | string,
    menuExpand?: boolean,
    selectedTab?: string,
    user?: User,
  }
// public 模块
  /* tslint:disable:no-empty-interface */
  interface PublicState {
  }
  /* tslint:disable:no-empty-interface */
  interface SystemState {
  }

// 以下是业务对象
// 菜单
  interface Menu extends IndexEd {
    id: string, // id
    name: string, // 菜单名称
    icon?: string, // 图标名称
    children?: Menu[] // 子菜单
  }
// 用户
  interface User extends IndexEd {
    id?: number, // id
    name?: string, // 用户名
    password?: string
  }
// page
  interface Page extends IndexEd {
    name: string,
    modelName: string,
    type: number,
    remark: string,
    addUrl?: string,
    updateUrl?: string,
    searchUrl?: string,
    delUrl?: string,
    viewUrl?: string,
    getUrl?: string,
  }
// UserDashboard
  interface UserDashboard extends IndexEd {
    x: number,
    y: number,
    w: number,
    h: number,
    i: string,
    dashboard: Dashboard
  }
// Dashboard
  interface Dashboard extends IndexEd {
    id: number,
    name: string,
    type: string,
    url: string,
    color: string,
  }
}
