/**
 * Created by 熊超超 on 2018/4/20.
 */
import { AsyncComponent } from 'vue'

const ChartLine: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartLine.vue')
const ChartHistogram: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartHistogram.vue')
const ChartPie: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartPie.vue')
const ChartRing: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartRing.vue')
const ChartToggle: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/ChartToggle.vue')
const Form: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/Form.vue')
const CrudDemo: AsyncComponent = (): any => import(/* webpackChunkName: "demo" */ './view/CrudDemo.vue')

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
  {
    path: '/form/crud',
    component: CrudDemo,
  },
]
