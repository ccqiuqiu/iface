<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div class="p-h-10 b-b f-18" :style="styleObj" data-flex="cross:center">
    <cc-icon data-flex-box="0" class="m-r-10" v-if="dashboard.icon" :name="dashboard.icon"></cc-icon>
    <span data-flex-box="1" class="p-v-8">{{dashboard.name}}</span>
    <span data-flex-box="0" v-if="more" class="ignore c-info f-12 cp" @click="$emit('click')">more</span>
  </div>
</template>
<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

export default @Component class DashboardTitle extends Vue {
  /* vue-props */
  @Prop() dashboard
  @Prop(Boolean) more
  /* vue-vuex */
  /* vue-data */
  data () {
    return {
      styleObj: {
        borderTop: `3px solid ${this.dashboard.color}`
      }
    }
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
