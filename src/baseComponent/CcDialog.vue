<!--Created by 熊超超 on 2018/5/21.-->
<template>
  <el-dialog :title="dialog.title" :width="width" v-bind="dialog.options"
             :visible.sync="dialog.visible"
             @close="onClose" :append-to-body="appendToBody">
    <cc-dialog v-if="!inside" inside append-to-body/>
    <cc-render :render-fun="dialog.content" v-if="dialog.content"></cc-render>

    <div slot="footer" class="dialog-footer" v-if="dialog.options && dialog.options.showBtn">
      <el-button type="primary" @click="onClose">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="jsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import CcRender from '@bc/CcRender.vue'
@Component({components: {CcRender, CcDialog2: () => import('./CcDialog.vue')}})
export default class CcDialog extends Vue {
  /* vue-props */
  @Prop(Boolean) inside
  @Prop(Boolean) appendToBody
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
