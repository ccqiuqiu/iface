/**
 * Created by 熊超超 on 2018/7/16.
 */
import {BaseDao} from './BaseDao'
import Dashboard from '../entity/Dashboard'

class DashboardDao extends BaseDao<Dashboard> {
  constructor() {
    super(Dashboard)
  }
}

export default new DashboardDao()
