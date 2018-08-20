<!--Created by 熊超超 on 2018/7/25.-->
<template>
  <div class="record" flex="cross:center" v-if="record">
    <span>{{recordText}}</span>
    <span :class="['save', {disable: recordStatus !== 1}]" @click="onSaveRecord">保存</span>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class CcRecord extends Vue {
  /* vue-props */
  /* vue-vuex */
  @Action saveRecord
  /* vue-data */
  recordStatus = 1
  /* vue-compute */
  get recordText () {
    if (this.recordStatus === 1) {
      return '录制中...'
    } else if (this.recordStatus === 2) {
      return '保存中...'
    } else if (this.recordStatus === 0) {
      return '保存成功'
    }
  }
  // 是否显示录制操作层
  get record () {
    return process.env.VUE_APP_RECORD
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  async onSaveRecord () {
    if (this.recordStatus === 1) {
      this.recordStatus = 2
      await this.saveRecord()
      this.recordStatus = 0
      setTimeout(() => (this.recordStatus = 1), 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .record{
    opacity: 0.8;
    background: white;
    position: fixed;
    bottom: 10px;
    left: 10px;
    padding: 2px 2px 2px 10px;
    border-radius: 4px;

    .save{
      margin-left: 10px;
      background: #f39c12;
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;

      &.disable{
        background: #909399;
      }
    }
  }
</style>
