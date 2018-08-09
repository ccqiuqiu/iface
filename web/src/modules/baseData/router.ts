/**
 * Created by 熊超超 on 2018/5/20.
 */
import { AsyncComponent } from 'vue'

const PageList: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/PageList.vue')
const CreateCrud: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/CreateCrud.vue')
const Page: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/Page.vue')
const PageEditor: AsyncComponent = (): any => import(/* webpackChunkName: "m1" */ './view/PageEditor.vue')

export default [
  {
    path: '/baseData/pageList',
    name: 'pageList',
    component: PageList,
  },
  {
    path: '/baseData/createCrud',
    name: 'createCrud',
    component: CreateCrud,
  },
  {
    path: '/baseData/pageEditor',
    name: 'pageEditor',
    component: PageEditor,
  },
  {
    path: '/baseData/page/:code',
    name: 'page',
    component: Page,
  },
]
