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
    </el-card>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import { Action, Mutation } from 'vuex-class'
  import {MessageTypeEnum} from '../../../assets/utils/enuns'

  @Component
  export default class Login extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('login') public loginAction: (user: User) => Promise<ActionReturn>
    @Mutation('clearStore') public clearStore: () => void
    /*vue-data*/
    public user: User = {
      name: 'admin',
      password: '123456',
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 用户登录
    public async login() {
      const {error, data} = await this.loginAction(this.user)
      if (error) {
        this.$utils.message(error.message, MessageTypeEnum.error)
      } else {
        this.$utils.message('登录成功')
        this.$router.push('/')
      }
    }
    public handlerData(data: any) {
      // 把菜单的id改为字符串
      const menus = data.auth.menus
      if (menus.length) {
        this.number2string(menus)
      }
    }
    public number2string(list: any[]) {
      list.forEach((item: any) => {
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