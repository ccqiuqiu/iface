<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div class="root" flex="dir:top box:last" :style="styleObj" v-if="data">
    <div flex="box:last cross:center" class="p-10">
      <div felx="">
        <div class="f-36">{{data.title}}</div>
        <div>{{dashboard.name}}</div>
      </div>
      <span class="icon"><cc-icon :name="dashboard.icon" size="50"></cc-icon></span>
    </div>
    <div class="more p-v-4 f-12 o-8 cp ignore" flex="cross:center main:center" @click="more">
      <span>更多</span>
      <span><cc-icon name="arrow" size="14"></cc-icon></span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DashboardItemInfo extends Vue {
    /*vue-props*/
    @Prop() public dashboard: Dashboard
    @Prop(Object) public data: {title: string, link: string}
    /*vue-vuex*/
    /*vue-data*/
    public styleObj: any = {
      backgroundColor: this.dashboard.color,
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    public more() {
      this.$router.push(this.data.link)
    }
  }
</script>

<style lang="scss" scoped>
  .root{
    color: white;

    .more{
      background: rgba(0,0,0, 0.2);
    }
    .icon{
      opacity: 0.5;
      transition: all 0.3s;
      transform-origin: 100% 50%;
    }
  }
  .root:hover .icon{
    transform: scale3d(1.2, 1.2, 1);
  }
</style>