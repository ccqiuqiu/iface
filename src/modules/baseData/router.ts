/**
 * Created by 熊超超 on 2018/5/20.
 */
import { AsyncComponent } from 'vue'

const PageList: AsyncComponent = (): any => import(/* webpackChunkName: "baseData" */ './view/PageList.vue')

export default [
  {
    path: '/baseData/pageList',
    name: 'pageList',
    component: PageList,
  },
]
