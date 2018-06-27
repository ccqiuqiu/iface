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
  statusRender: {
    label: 'JSX-状态',
    format: (h: any, row: any) => <el-tag size='small' type={row.status === $c.StatusV.禁用 ? 'info' : ''}>{$c.StatusK[row.status]}</el-tag>,
  },
}
export default CrudUtils
