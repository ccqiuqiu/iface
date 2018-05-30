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
  renderCell?: (h: any, row: any, index: number, column: TableColumn, store: any) => any
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
