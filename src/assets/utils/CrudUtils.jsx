/**
 * Created by 熊超超 on 2018/6/5.
 */
import * as $c from './constant'
const CrudUtils = {
  sexFormat: (row, column, cellValue) => {
    return $c.SexK[cellValue]
  },
  statusFormat: (row, column, cellValue) => {
    return $c.StatusK[cellValue]
  },
  statusRender: (h, row) => <el-tag size='small' type={row.status === $c.StatusV.禁用 ? 'info' : ''}>{$c.StatusK[row.status]}</el-tag>

}
export default CrudUtils
