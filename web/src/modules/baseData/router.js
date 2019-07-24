/**
 * Created by 熊超超 on 2018/5/20.
 */

const PageList = () => import(/* webpackChunkName: "system" */ './view/PageList.vue')
const CreateCrud = () => import(/* webpackChunkName: "system" */ './view/CreateCrud.vue')
const Page = () => import(/* webpackChunkName: "common" */ './view/Page.vue')
const PageEditor = () => import(/* webpackChunkName: "system" */ './view/PageEditor.vue')
const IframePage = () => import(/* webpackChunkName: "common" */ './view/IframePage.vue')

export default [
  {
    path: '/baseData/pageList',
    name: 'pageList',
    component: PageList
  },
  {
    path: '/baseData/createCrud*',
    name: 'createCrud',
    component: CreateCrud
  },
  {
    path: '/baseData/pageEditor',
    name: 'pageEditor',
    component: PageEditor
  },
  {
    path: '/baseData/page/*',
    name: 'page',
    component: Page
  },
  {
    path: '/baseData/iframe*',
    name: 'iframePage',
    component: IframePage
  }
]
