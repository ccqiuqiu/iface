<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <el-form :model="user" label-width="100px">
    <el-form-item label="用户名">
      <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="user.tel" placeholder="请输入电话号码"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="user.sex">
        <el-radio :label="value" v-for="(value, key) in $c.SexV" :key="value">{{key}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="user.status">
        <el-option v-for="(value, key) in $c.StatusV" :key="value" :label="key" :value="value">
        </el-option>
      </el-select>
    </el-form-item>
    <div class="action">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button>重置</el-button>
    </div>
  </el-form>
</template>

<script lang="tsx">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import {Action} from 'vuex-class'

  @Component
  export default class EditUser extends Vue {
    @Prop({default: () => ({
        password: '123456',
        sex: 1,
        status: 1,
      })}) public user!: User
    /* vue-props */
    /* vue-vuex */
    @Action('saveUser') public saveUser: (user: User) => Promise<ActionReturn>
    /* vue-data */
    /* vue-compute */
    /* vue-watch */
    /* vue-lifecycle */
    /* vue-method */
    // 保存用户
    public async save() {
      const {error} = await this.saveUser(this.user)
      if (!error) {
        this.$utils.message('保存成功')
        this.$utils.hideDialog()
        this.$emit('refresh')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>