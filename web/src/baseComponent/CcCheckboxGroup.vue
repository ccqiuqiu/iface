<!--Created by 熊超超 on 2018/6/7.-->
<template>
  <el-checkbox-group v-model="model" v-bind="$attrs" v-if="Array.isArray(options)">
    <template v-if="type === 'checkbox'">
      <el-checkbox v-bind="option" :label="option.value" name="name" :key="option.value" v-for="option in options">{{option.label}}</el-checkbox>
    </template>
    <template v-else>
      <el-checkbox-button v-bind="option" :label="option.value" name="name" :key="option.value" v-for="option in options">{{option.label}}</el-checkbox-button>
    </template>
  </el-checkbox-group>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

export default @Component class CcCheckBoxGroup extends Vue {
  /* vue-props */
  @Prop(Array) value
  @Prop([Array, String]) options
  @Prop(String) type
  /* vue-vuex */
  /* vue-data */
  data () {
    return {
      model: this.value || []
    }
  }
  /* vue-compute */
  /* vue-watch */
  @Watch('value')
  valueChange (val) {
    this.model = val || []
  }
  @Watch('model')
  modelChange (val) {
    this.$emit('input', val)
  }
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
