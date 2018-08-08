<!--Created by 熊超超 on 2018/8/7.-->
<template>
  <component v-bind:is="component"></component>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcRendeVue extends Vue {
    /*vue-props*/
    @Prop(String) public code: string
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get template() {
      return 'code'
    }
    get script(): any {
      return {
        data() {
          return {
            aaa: 111,
          }
        },
      }
    }
    get style() {
      return ''
    }
    get component() {
      return {...this.script, template: this.template}
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>