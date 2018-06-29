<!--Created by 熊超超 on 2018/6/13.-->
<template>
  <el-select v-model="model" v-bind="$attrs" :multiple="multiSelect"  v-on="$listeners">
    <el-option :label="option.label" :value="option.value" :key="option.value" v-for="option in options"/>
  </el-select>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class CcSelect extends Vue {
    /*vue-props*/
    @Prop([Array, String, Number]) public value: any | any[]
    @Prop([Array, String]) public options: any[] | string
    // @Prop(Boolean) public multiple: boolean
    @Prop(Boolean) public multiSelect: boolean
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get model() {
      if (!this.value) {
        return this.multiSelect ? [] : ''
      } else {
        if (this.multiSelect) {
          return Array.isArray(this.value) ? this.value : [this.value]
        } else {
          return Array.isArray(this.value) ? (this.value[0] || '') : this.value
        }
      }
    }
    set model(val) {
      this.$emit('input', val)
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>