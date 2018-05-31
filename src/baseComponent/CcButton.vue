<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <el-button v-bind="$attrs" :type="type" @click.native="$emit('click')">
    <span flex="cross:center">
      <cc-icon v-if="icon" v-bind="$attrs" :name="icon" :size="iconSize" class="m-r-6"/>
      <span>{{text}}</span>
    </span>
  </el-button>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcButton extends Vue {
    @Prop({required: true}) private text!: string
    @Prop({default: 'primary'}) private type!: string
    @Prop({default: 'small'}) private size!: string
    @Prop() private icon!: string

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
