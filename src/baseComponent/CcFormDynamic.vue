<!--Created by 熊超超 on 2018/7/9.-->
<template>
  <cc-form :data="formData" v-if="formData && show" fullWidth v-on="$listeners" v-bind="$attrs"/>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import {Action} from 'vuex-class'

  @Component
  export default class CcFormDynamic extends Vue {
    /*vue-props*/
    @Prop() public formCode: string
    @Prop() public model: any
    /*vue-vuex*/
    @Action public getPage: (pageCode: string) => Promise<ActionReturn>
    /*vue-data*/
    public formObject: any = null
    public show: boolean = true
    /*vue-compute*/
    get formData() {
      return this.formObject && this.model ? {...this.formObject, model: this.model} : null
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.getFormJson()
    }
    /*vue-method*/
    public async getFormJson() {
      const {data} = await this.getPage(this.formCode)
      if (data) {
        this.formObject = JSON.parse(data.value)
      }
    }
    public forceUpdate() {
      this.show = false
      this.$nextTick(() => this.show = true)
    }
  }
</script>

<style lang="scss" scoped>
</style>