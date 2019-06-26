<!--Created by 熊超超 on 2018/4/26.-->
<template>
  <div data-flex="dir:top" v-loading="!authSuccess">
    <vue-progress-bar></vue-progress-bar>
    <header-view data-flex-box="0" v-if="false"/>
    <div data-flex="box:first" data-flex-box="1" v-if="authSuccess" >
      <div data-flex=""><menu-view/></div>
      <div data-flex="dir:top">
        <nav-view data-flex-box="0"></nav-view>
        <tabs-view data-flex-box="0"></tabs-view>
        <div class="main-view" data-flex-box="1">
          <keep-alive>
            <router-view class="content-view"/>
          </keep-alive>
        </div>
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
  /* 监听路由变化 */
  @Watch('$route')
  routerChange (val) {
    this.$utils.toTab(val.fullPath)
  }
  /* vue-lifecycle */
  async created () {
    const token = sessionStorage.getItem('token')
    let ticket = sessionStorage.getItem('ticket') || this.$utils.url2Obj(document.URL)['ticket']
    if (!token && !ticket) {
      this.$router.push({name: 'login', params: {url: document.URL}})
      return
    }
    if (!token && ticket) {
      const { data } = await this.$store.dispatch('ticketLogin', {ticket})
      if (data) {
        sessionStorage.setItem('token', data.token)
        this.$utils.message('登录成功')
        // 去除url上面的ticket
        this.$router.replace({name: this.$route.name})
      }
    }
    this.initAuth()
  }
  /* vue-method */
  async initAuth () {
    // 获取权限
    const { data } = await this.$store.dispatch('getAuth')
    this.authSuccess = true
    if (data) {
      this.handlerData(data)
      this.$store.commit('updateUser', data)
    }
  }
  handlerData (data) {
    // 把菜单的id改为字符串
    const menus = data.auth.menus
    if (menus.length) {
      this.number2string(menus)
    }
  }
  number2string (list) {
    list.forEach((item) => {
      item.id = item.id + ''
      // 将补全特殊的url
      if (item.url.startsWith('http')) {
        item.url = '/baseData/iframe?url=' + encodeURIComponent(item.url)
      } else {
        if (item.url && !item.url.startsWith('/')) {
          item.url = '/baseData/page/' + item.url
        }
      }
      if (item.children) {
        this.number2string(item.children)
      }
    })
  }
}
</script>
<style lang="scss">
</style>
