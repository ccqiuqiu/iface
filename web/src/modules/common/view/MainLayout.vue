<!--Created by 熊超超 on 2018/4/26.-->
<template>
  <div data-flex="dir:top" v-loading="!authSuccess">
    <vue-progress-bar></vue-progress-bar>
    <header-view data-flex-box="0" v-if="false"/>
    <div data-flex="box:first" class="h-100" data-flex-box="1" v-if="authSuccess" >
      <div data-flex=""><menu-view/></div>
      <div data-flex="dir:top">
        <nav-view data-flex-box="0"></nav-view>
        <tabs-view data-flex-box="1"></tabs-view>
      </div>
    </div>
    <cc-dialog></cc-dialog>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import HeaderView from '../../common/view/HeaderView.vue'
import MenuView from './MenuView.vue'
import NavView from '../../common/view/NavView.vue'
import TabsView from '../../common/view/TabsView.vue'
import CcDialog from '../../../baseComponent/CcDialog.vue'

export default @Component({
  components: { HeaderView, MenuView, NavView, TabsView, CcDialog }
})
class MainLayout extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  authSuccess = false
  /* vue-compute */
  /* vue-watch */
  /* 监听路由变化,用于路由改变的时候定位到正确的tab页 */
  @Watch('$route', {immediate: true})
  routerChange (val) {
    this.$tab.toTab(val.fullPath)
  }
  /* vue-lifecycle */
  async created () {
    // 登录验证
    const token = sessionStorage.getItem('token')
    let ticket = this.$utils.getUrlParams('ticket')
    if (!token && !ticket) {
      this.$router.push({name: 'login', query: {url: document.URL}})
      return
    }
    if (!token && ticket) {
      const { data } = await this.$store.dispatch('ticketLogin', {ticket})
      if (data) {
        sessionStorage.setItem('token', data.token)
        this.$utils.message('登录成功')
      }
    }
    if (ticket) {
      // 去除url上面的ticket
      const {name, params, query: {ticket: ticket2, ...newQuery}} = this.$route
      this.$router.replace({name, params, query: newQuery})
    }
    this.initAuth()
  }
  /* vue-method */
  async initAuth () {
    // 获取权限
    const { data } = await this.$store.dispatch('getAuth')
    this.authSuccess = true
    if (data) {
      this.$store.commit('updateUser', data)
    }
  }
}
</script>
<style lang="scss">
</style>
