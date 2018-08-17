/**
 * Created by 熊超超 on 2018/5/20.
 */

const PageList = () => import(/* webpackChunkName: "m1" */ './view/PageList.vue')
const CreateCrud = () => import(/* webpackChunkName: "m1" */ './view/CreateCrud.vue')
const Page = () => import(/* webpackChunkName: "m1" */ './view/Page.vue')
const PageEditor = () => import(/* webpackChunkName: "m1" */ './view/PageEditor.vue')

export default [
  {
    path: '/baseData/pageList',
    name: 'pageList',
    component: PageList
  },
  {
    path: '/baseData/createCrud',
    name: 'createCrud',
    component: CreateCrud
  },
  {
    path: '/baseData/pageEditor',
    name: 'pageEditor',
    component: PageEditor
  },
  {
    path: '/baseData/page/:code',
    name: 'page',
    component: Page
  }
]
