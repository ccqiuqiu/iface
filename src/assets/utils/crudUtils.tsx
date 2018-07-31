/**
 * Created by 熊超超 on 2018/6/5.
 * 这个文件是动态CRUD页面的时候，为自定义列提供一些格式化方法
 * 如果要增加方法，就在CrudUtils对象里面定义一个属性，属性名以Format或者Render结尾
 * 属性值是一个对象，包含label（显示在下拉列表中的名称）和format（实际格式化的方法）
 */

import {constant} from './constant'

const CrudUtils: any = {
  sexFormat: {
    label: '格式化-性别',
    format: (row: any, column: any, cellValue: number) => {
      return constant.SexK[cellValue]
    },
  },
  statusFormat: {
    label: '格式化-状态',
    format: (row: any, column: any, cellValue: number) => {
      return constant.StatusK[cellValue]
    },
  },
  dashboardTypeFormat: {
    label: '格式化-Dashboard类型',
    format: (row: any, column: any, cellValue: number) => {
      return constant.DashboardTypeK[cellValue]
    },
  },
  statusRender: {
    label: 'JSX-状态',
    format: (h: any, val: any) => <el-tag size='small' type={val === constant.StatusV.禁用 ? 'info' : ''}>{constant.StatusK[val]}</el-tag>,
  },
  colorRender: {
    label: 'JSX-颜色',
    format: (h: any, val: any) => <div style={{ width: '24px', height: '24px', backgroundColor: val}}></div>,
  },
}
export default CrudUtils
