<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="login" data-flex="main:center cross:center" v-if="!isRedirect">
    <el-card class="card">
      <div slot="header" data-flex="cross:center box:last">
        <span>用户登录</span>
      </div>
      <el-form label-width="60px" class="m-h-20 full-width">
        <el-form-item label="用户名">
          <el-input type="text" v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div data-flex="main:right">
        <el-button type="primary" @click="login" :loading="loading">登录</el-button>
      </div>
      <div class="c-info">测试账号：admin/test  密码：123456</div>
    </el-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component class Login extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  user = {
    userName: 'admin',
    password: '123456'
  }
  loading = false
  isRedirect = true
  /* vue-compute */
  get redirectUrl () {
    return this.$route.query['url']
  }
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    if (this.redirectUrl && this.$env.ssoUrl) {
      window.location.href = this.$env.ssoUrl + '/login?service=' + encodeURIComponent(this.redirectUrl)
    } else {
      this.isRedirect = false
    }
  }
  /* vue-method */
  // 用户登录
  async login () {
    this.loading = true
    const { data } = await this.$store.dispatch('login', this.user)
    this.loading = false
    if (data) {
      // this.$ls.set('token', data.token)
      sessionStorage.setItem('token', data.token)
      this.$utils.message('登录成功')
      const path = this.redirectUrl ? this.redirectUrl.replace(location.origin, '') : '/'
      this.$router.push(path)
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
      if (item.url && item.url.substr(0, 1) !== '/') {
        item.url = '/baseData/page/' + item.url
      }
      if (item.children) {
        this.number2string(item.children)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  .login{
    background-color: $bg0;
  }
</style>
