/**
 * Created by 熊超超 on 2018/4/20.
 */

const Login = () => import(/* webpackChunkName: "m1" */ './view/Login.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
