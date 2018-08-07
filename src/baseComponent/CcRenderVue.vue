<!--Created by 熊超超 on 2018/8/7.-->
<template>
  <component v-bind:is="component"></component>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcRendeVue extends Vue {
    /*vue-props*/
    @Prop(String) public data: string
    /*vue-vuex*/
    /*vue-data*/
    public component: any = {
      template: '<div>{{aaa}}</div>',
      data() {
        return {
          aaa: 111,
        }
      },
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>