/**
 * Created by 熊超超 on 2018/5/20.
 */

const MenuTree = () => import(/* webpackChunkName: "m1" */ './view/MenuTree.vue')

export default [
  {
    path: '/system/menu',
    name: 'menu',
    component: MenuTree
  }
]
