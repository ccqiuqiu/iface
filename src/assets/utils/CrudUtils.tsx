/**
 * Created by 熊超超 on 2018/6/5.
 */
import * as $c from './constant'
const CrudUtils: any = {
  sexFormat: (row: any, column: any, cellValue: number) => {
    return $c.SexK[cellValue]
  },
  statusFormat: (row: any, column: any, cellValue: number) => {
    return $c.StatusK[cellValue]
  },
  statusRender: (h: any, row: any) => <el-tag size='small' type={row.status === $c.StatusV.禁用 ? 'info' : ''}>{$c.StatusK[row.status]}</el-tag>,

}
export default CrudUtils
