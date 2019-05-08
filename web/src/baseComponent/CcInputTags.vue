<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div class="input-con">
    <div class="tags" v-if="value && value.length">
      <el-tag size="mini" type="info" v-for="(item, index) in showList" :key="index" closable @close="$emit('del', item)">{{item[label]}}</el-tag>
      <el-tag size="mini" type="info" v-if="otherNum > 0">+{{otherNum}}</el-tag>
    </div>
    <el-input type="text" readonly :placeholder="myPlaceholder">
    </el-input>
    <span class="icon"><cc-icon :name="icon" size="18"></cc-icon></span>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

export default @Component class CcInputTags extends Vue {
  /* vue-props */
  @Prop() value
  @Prop(String) placeholder
  @Prop({ type: String, default: 'name' }) label
  @Prop(String) icon
  @Prop(Boolean) collapseTags
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get myPlaceholder () {
    return this.value.length === 0 ? this.placeholder : ''
  }
  get showList () {
    if (!this.collapseTags) {
      return this.value.slice(0, Math.min(20, this.value.length))
    } else {
      return this.value.slice(0, 1)
    }
  }
  get otherNum () {
    return this.value.length - this.showList.length
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/vars";
  .el-form-item.is-error .input-con{
    border-color: $color-danger;
  }
  .el-form-item.is-success .input-con{
    border-color: $color-success;
  }
  .el-form-item .input-con:focus{
    border-color: $color-primary;
  }
  .input-con {
    position: relative;
    border: 1px solid $--border-color-base;
    border-radius: 4px;
    background-color: white;
    min-height: 32px;
    padding-right: 30px;
    /deep/ input{
      border: 0!important;
    }
    /deep/ .el-input{
      position: absolute;
      top: 0;
    }
    &:hover{
      border-color: $--color-text-placeholder;
    }
    .icon{
      text-align: center;
      color: $--color-text-placeholder;
      width: 30px;
      height: 30px;
      position: absolute;
      transform: translate3d(0, -50%, 0);
      top: 50%;
      right: 0;
    }

    .tags {
      z-index: 10;
      position: relative;
      left: 0;
    }
  }
  /deep/ .el-tag{
    box-sizing: border-box;
    background-color: #f0f2f5;
    border-color: transparent;
    margin: 2px 0 2px 6px;

    .el-tag__close.el-icon-close{
      background-color: #c0c4cc;
      color: $color-white;
    }
    .el-tag__close.el-icon-close:hover{
      background-color: #909399;
    }
  }
</style>
