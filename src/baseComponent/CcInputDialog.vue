<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="getSelectTag" @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputDialog extends Vue {
    /*vue-props*/
    @Prop() private dialog: any
    @Prop() private title: string
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get getSelectTag() {
      return []
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 显示弹窗
    private show() {
      this.$utils.dialog(this.title, (h: any) => <div>
        <cc-crud data={this.dialog} type='dialog'></cc-crud>
        <div class='action'>
          <el-button type='primary' onClick={this.select}>选择</el-button>
        </div>
      </div>)
    }
    // 删除标签
    private delTag(item: any) {
      return null
    }
    // 点击选择按钮
    private select() {
      this.$utils.hideDialog()
    }
  }
</script>

<style lang="scss" scoped>
</style>