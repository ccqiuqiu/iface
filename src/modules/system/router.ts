/**
 * Created by 熊超超 on 2018/5/20.
 */
import { AsyncComponent } from 'vue'

const User: AsyncComponent = (): any => import(/* webpackChunkName: "system" */ './view/User.vue')

export default [
  {
    path: '/system/user',
    name: 'user',
    component: User,
  },
]
