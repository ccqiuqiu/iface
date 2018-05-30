/**
 * Created by 熊超超 on 2018/4/20.
 */
import { AsyncComponent } from 'vue'

const ChartLine: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartLine.vue')

export default [
  {
    path: '/chart/line',
    component: ChartLine,
  },
]
