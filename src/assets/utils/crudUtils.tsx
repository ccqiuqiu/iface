/**
 * Created by 熊超超 on 2018/6/5.
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
