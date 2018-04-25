import Vue from 'vue'
import Router from 'vue-router'
import common from '../modules/common/router'
import publicRouter from '../modules/public/router'

Vue.use(Router)

export default new Router({
  routes: [
    ...common,
    ...publicRouter,
    {
      path: '*',
      redirect: '/',
    },
  ],
})
