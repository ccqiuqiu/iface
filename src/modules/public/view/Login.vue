<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="login" flex="main:center cross:center">
    <el-card class="card">
      <div slot="header" flex="cross:center box:last">
        <span>用户登录</span>
        <el-button type="text">注册</el-button>
      </div>
      <el-form label-width="60px" class="m-h-20">
        <el-form-item label="用户名">
          <el-input type="text" v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div flex="main:right">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import { State, Action, Mutation } from 'vuex-class'

  @Component
  export default class Login extends Vue {
    @Action('login') private loginAction: (user: User) => Promise<ActionReturn>
    @Mutation('clearStore') private clearStore: () => void

    private user: User = {
      userName: 'cc',
      password: '123456',
    }

    private async login() {
      const {error, data} = await this.loginAction(this.user)
      if (error) {
        this.$utils.message(error.message, false)
      } else {
        this.$utils.message('登录成功')
        this.$utils.set('token', data.token)
        // 清除store里面缓存的数据
        this.clearStore()
        this.$router.push('/')
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  .login{
    background-color: $bg0;
  }
</style>