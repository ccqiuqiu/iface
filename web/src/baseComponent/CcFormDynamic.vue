<!--Created by 熊超超 on 2018/7/9.-->
<template>
  <cc-form :data="formData" v-if="formData && show" fullWidth v-on="$listeners" v-bind="$attrs"/>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

export default @Component class CcFormDynamic extends Vue {
  /* vue-props */
  @Prop() formCode
  @Prop() model
  /* vue-vuex */
  @Action getPage
  /* vue-data */
  formObject = null
  show = true
  /* vue-compute */
  get formData () {
    return this.formObject && this.model ? { ...this.formObject, model: this.model } : null
  }
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.getFormJson()
  }
  /* vue-method */
  async getFormJson () {
    const { data } = await this.getPage(this.formCode)
    if (data) {
      this.formObject = JSON.parse(data.value)
    }
  }
  forceUpdate () {
    this.show = false
    this.$nextTick(() => (this.show = true))
  }
}
</script>

<style lang="scss" scoped>
</style>
