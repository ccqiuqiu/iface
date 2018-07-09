/**
 * Created by 熊超超 on 2018/5/20.
 */
import { AsyncComponent } from 'vue'

const MenuTree: AsyncComponent = (): any => import(/* webpackChunkName: "system" */ './view/MenuTree.vue')

export default [
  {
    path: '/system/menu',
    name: 'menu',
    component: MenuTree,
  },
]
