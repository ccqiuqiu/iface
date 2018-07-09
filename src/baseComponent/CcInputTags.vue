<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div class="input-con">
    <div class="tags" v-if="value && value.length">
      <el-tag size="mini" type="info" closable @close="$emit('del', value[0])">{{value[0][this.label]}}</el-tag>
      <el-tag size="mini" type="info" v-if="value.length > 1">+{{value.length - 1}}</el-tag>
    </div>
    <el-input type="text" readonly :placeholder="myPlaceholder">
      <cc-icon slot="suffix" :name="icon" size="18"></cc-icon>
    </el-input>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class CcInputTags extends Vue {
    /*vue-props*/
    @Prop() public value: any[]
    @Prop() public placeholder: string
    @Prop({default: 'name'}) public label: string
    @Prop(String) public icon: string
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get myPlaceholder() {
      return this.value.length === 0 ? this.placeholder : ''
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/vars";
  .input-con {
    position: relative;

    .tags {
      z-index: 10;
      position: absolute;
      left: 0;
    }
  }
  .el-tag{
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