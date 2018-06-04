<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="getSelectTag" @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputDialog extends Vue {
    /*vue-props*/
    @Prop() private dialog: any
    @Prop() private title: string
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get getSelectTag() {
      return []
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    private show() {
      this.$utils.dialog(this.title, (h: any) => <cc-crud data={this.dialog}>dddd</cc-crud>)
    }
    private delTag(item: any) {
      return null
    }
  }
</script>

<style lang="scss" scoped>
</style>