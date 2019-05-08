<!--Created by 熊超超 on 2018/5/21.-->
<template>
  <el-dialog v-if="dialog && dialog.visible" :title="dialog.title" :width="width" v-bind="dialog.options"
             :visible="dialog.visible"
             @close="onClose" :append-to-body="appendToBody">

    <cc-dialog v-if="!inside" :inside="true" append-to-body/>
    <cc-render :render-fun="dialog.content" v-if="dialog.content"></cc-render>

    <div slot="footer" class="dialog-footer" v-if="dialog.options && dialog.options.showBtn">
      <el-button type="primary" @click="onClose">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import CcRender from './CcRender.vue'
export default @Component({ components: { CcRender, CcDialog: () => import('./CcDialog.vue') } }) class CcDialog extends Vue {
  /* vue-props */
  @Prop({ type: Boolean, default: false }) inside
  @Prop({ type: Boolean, default: false }) appendToBody
  /* vue-vuex */
  @Getter('dialog') getDialog

  get dialog () {
    return this.getDialog(this.inside)
  }
  get width () {
    if (this.dialog.options && this.dialog.options.width) {
      return this.dialog.options.width
    } else {
      return this.inside ? '60%' : '70%'
    }
  }
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  onClose () {
    if (this.dialog.visible) {
      this.$utils.hideDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
