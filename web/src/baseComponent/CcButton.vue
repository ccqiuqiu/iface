<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <el-button v-bind="$attrs" :type="type" @click.native="$emit('click')">
    <span flex="cross:center">
      <cc-icon v-if="icon" v-bind="$attrs" :name="icon" :size="iconSize"/>
      <span v-if="text" class="m-l-6">{{text}}</span>
    </span>
  </el-button>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcButton extends Vue {
    @Prop() public text: string
    @Prop({default: 'primary'}) public type!: string
    @Prop({default: 'small'}) public size!: string
    @Prop() public icon!: string

    get iconSize() {
      if (this.size === 'medium') {
        return 10
      } else if (this.size === 'small') {
        return 12
      } else if (this.size === 'mini') {
        return 14
      } else {
        return 16
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
