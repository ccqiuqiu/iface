/**
 * Created by 熊超超 on 2018/6/21.
 */

import {BaseDao} from './BaseDao'
import Page from '../entity/Page'

class PageDao extends BaseDao<Page> {
  constructor() {
    super(Page)
  }
}

export default new PageDao()
