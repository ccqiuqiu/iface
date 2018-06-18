/**
 * Created by 熊超超 on 2018/4/20.
 */

const ChartLine = () => import(/* webpackChunkName: "demo" */ './view/ChartLine.vue')
const ChartHistogram = () => import(/* webpackChunkName: "demo" */ './view/ChartHistogram.vue')
const ChartPie = () => import(/* webpackChunkName: "demo" */ './view/ChartPie.vue')
const ChartRing = () => import(/* webpackChunkName: "demo" */ './view/ChartRing.vue')
const ChartToggle = () => import(/* webpackChunkName: "demo" */ './view/ChartToggle.vue')
const Form = () => import(/* webpackChunkName: "demo" */ './view/Form.vue')
const CrudDemo = () => import(/* webpackChunkName: "demo" */ './view/CrudDemo.vue')

export default [
  {
    path: '/chart/line',
    component: ChartLine
  },
  {
    path: '/chart/histogram',
    component: ChartHistogram
  },
  {
    path: '/chart/ring',
    component: ChartRing
  },
  {
    path: '/chart/pie',
    component: ChartPie
  },
  {
    path: '/chart/toggle',
    component: ChartToggle
  },
  {
    path: '/form/form',
    component: Form
  },
  {
    path: '/form/crud',
    component: CrudDemo
  }
]
