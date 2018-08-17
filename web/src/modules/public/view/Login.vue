<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="login" flex="main:center cross:center">
    <el-card class="card">
      <div slot="header" flex="cross:center box:last">
        <span>用户登录</span>
      </div>
      <el-form label-width="60px" class="m-h-20 full-width">
        <el-form-item label="用户名">
          <el-input type="text" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div flex="main:right">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="c-info">测试账号：admin/test  密码：123456</div>
    </el-card>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import { Action, Mutation } from 'vuex-class'

@Component
export default class Login extends Vue {
    /* vue-props */
    /* vue-vuex */
    @Mutation('clearStore') clearStore
    @Action('login') loginAction
    /* vue-data */
    user = {
      name: 'admin',
      password: '123456'
    }
    /* vue-compute */
    /* vue-watch */
    /* vue-lifecycle */
    /* vue-method */
    // 用户登录
    async login () {
      const {data} = await this.loginAction(this.user)
      if (data) {
        this.$ls.set('token', data.token)
        this.$utils.message('登录成功')
        this.$router.push('/')
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
