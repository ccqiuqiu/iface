<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="home">
    <grid-layout
                 :layout="items"
                 :col-num="8"
                 :row-height="30"
                 :is-draggable="true"
                 :is-resizable="true"
                 :is-mirrored="false"
                 :vertical-compact="true"
                 :use-css-transforms="true">

      <grid-item v-for="item in items" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <dashboard-item :data="item.data"></dashboard-item>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'
  import VueGridLayout from 'vue-grid-layout'
  import DashboardItem from '../fragment/DashboardItem.vue'

  @Component({components: {GridLayout: VueGridLayout.GridLayout, GridItem: VueGridLayout.GridItem, DashboardItem}})
  export default class Home extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    public items: any[] = [
      {x: 0, y: 0, w: 2, h: 3, i: '0', data: {title: '111'}},
      {x: 2, y: 2, w: 2, h: 3, i: '1', data: {title: '333'}},
    ]
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
  .home.content-view{
    margin: 0 !important;
    width: 100% !important;
  }
  .home /deep/ .vue-grid-item{
    overflow: hidden;
    background-color: white;
    border-radius: 4px;
  }
</style>
