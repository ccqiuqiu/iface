<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <el-button v-bind="$attrs" :type="type" @click.native="$emit('click')">
    <span data-flex="cross:center">
      <cc-icon v-if="icon" v-bind="$attrs" :name="icon" :size="iconSize"/>
      <span v-if="text" class="m-l-6">{{text}}</span>
    </span>
  </el-button>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

export default @Component class CcButton extends Vue {
  @Prop(String) text
  @Prop({ type: String, default: 'primary' }) type
  @Prop({ type: String, default: 'small' }) size
  @Prop(String) icon

  get iconSize () {
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
