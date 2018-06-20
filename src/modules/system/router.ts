/**
 * Created by 熊超超 on 2018/5/20.
 */
import { AsyncComponent } from 'vue'

const User: AsyncComponent = (): any => import(/* webpackChunkName: "system" */ './view/User.vue')
const CreateCrud: AsyncComponent = (): any => import(/* webpackChunkName: "system" */ './view/CreateCrud.vue')

export default [
  {
    path: '/system/user',
    name: 'user',
    component: User,
  },
  {
    path: '/system/createCrud/:type',
    name: 'createCrud',
    component: CreateCrud,
  },
]
