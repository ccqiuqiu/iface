/**
 * Created by 熊超超 on 2018/6/5.
 */
import * as $c from './constant'
const CrudUtils: any = {
  sexFormat: {
    label: '格式化-性别',
    format: (row: any, column: any, cellValue: number) => {
      return $c.SexK[cellValue]
    },
  },
  statusFormat: {
    label: '格式化-状态',
    format: (row: any, column: any, cellValue: number) => {
      return $c.StatusK[cellValue]
    },
  },
  dashboardTypeFormat: {
    label: '格式化-Dashboard类型',
    format: (row: any, column: any, cellValue: number) => {
      return $c.DashboardTypeK[cellValue]
    },
  },
  statusRender: {
    label: 'JSX-状态',
    format: (h: any, val: any) => <el-tag size='small' type={val === $c.StatusV.禁用 ? 'info' : ''}>{$c.StatusK[val]}</el-tag>,
  },
  colorRender: {
    label: 'JSX-颜色',
    format: (h: any, val: any) => <div style={{ width: '24px', height: '24px', backgroundColor: val}}></div>,
  },
}
export default CrudUtils
