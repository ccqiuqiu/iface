<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="login" flex="main:center cross:center">
    <el-card class="card">
      <div slot="header" flex="cross:center box:last">
        <span>用户登录</span>
      </div>
      <el-form label-width="60px" class="m-h-20 single-line">
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
    /*vue-props*/
    /*vue-vuex*/
    @Action('login') private loginAction: (user: User) => Promise<ActionReturn>
    @Mutation('clearStore') private clearStore: () => void
    @Mutation('updateUser') private updateUser: (data: any) => void
    /*vue-data*/
    private user: User = {
      userName: 'admin',
      password: '123456',
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 用户登录
    private async login() {
      const {error, data} = await this.loginAction(this.user)
      if (error) {
        this.$utils.message(error.message, 'error')
      } else {
        this.$utils.message('登录成功')
        // 清除store里面缓存的数据
        this.clearStore()
        // 设置新的数据
        this.$utils.set('token', data.token)
        this.updateUser(data)
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