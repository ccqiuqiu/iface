/**
 * Created by 熊超超 on 2018/4/20.
 */
import { AsyncComponent } from 'vue'

const ChartLine: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/ChartLine.vue')
const ChartHistogram: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/ChartHistogram.vue')
const ChartPie: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/ChartPie.vue')
const ChartRing: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/ChartRing.vue')
const ChartToggle: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/ChartToggle.vue')
const Form: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/Form.vue')

export default [
  {
    path: '/chart/line',
    component: ChartLine,
  },
  {
    path: '/chart/histogram',
    component: ChartHistogram,
  },
  {
    path: '/chart/ring',
    component: ChartRing,
  },
  {
    path: '/chart/pie',
    component: ChartPie,
  },
  {
    path: '/chart/toggle',
    component: ChartToggle,
  },
  {
    path: '/form/form',
    component: Form,
  },
]
