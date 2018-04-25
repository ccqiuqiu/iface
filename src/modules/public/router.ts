/**
 * Created by 熊超超 on 2018/4/20.
 */
import { AsyncComponent } from 'vue'

const Login: AsyncComponent = (): any => import(/* webpackChunkName: "public" */ './view/Login.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]
