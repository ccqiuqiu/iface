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
    <div class="action">
      <cc-icon name="layout" class="c-white"></cc-icon>
    </div>
  </div>
</template>

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'
  import VueGridLayout from 'vue-grid-layout'
  import DashboardItem from '../fragment/DashboardItem.vue'
  import {Action} from 'vuex-class'
  import {DashboardType} from '../../../assets/utils/constant'

  @Component({components: {GridLayout: VueGridLayout.GridLayout, GridItem: VueGridLayout.GridItem, DashboardItem}})
  export default class Home extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action public getUserDashboard: () => Promise<ActionReturn>
    /*vue-data*/
    public userDashboard: UserDashboard[] = []
    public items: UserDashboard[] = [
      {x: 0, y: 0, w: 2, h: 3, i: '0', dashboard: {name: '111', type: 1, url: ''}},
      {x: 2, y: 0, w: 2, h: 3, i: '1', dashboard: {name: '222', type: 1, url: ''}},
    ]
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    public async initData() {
      const {data} = await this.getUserDashboard()
      if (data && data.length) {
        // 返回的是用户的dashboard配置数据，直接赋值给userDashboard
        if (data[0].dashboard) {
          this.userDashboard = data
        } else {
          // 用户没有配置dashboard，后端返回默认的几个dashboard，需要转成userDashboard
          let preX = 0
          let preY = 0
          this.userDashboard = data.map((dashboard: Dashboard, index: number) => {
            let w: number = 2
            let h: number = 3
            if (dashboard.type === DashboardType.信息面板) {
              w = 4
              h = 8
            }
            const userDashboard: UserDashboard = {
              x: preX, y: preY, w, h, i: index + '', dashboard,
            }
            preX += w
            preY += h
            return userDashboard
          })
        }
      }
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .home.content-view{
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  .home /deep/ .vue-grid-item{
    overflow: hidden;
    background-color: white;
    border-radius: 4px;
  }
  .home {
    .action{
      cursor: pointer;
      position: absolute;
      right: 16px;
      bottom: 16px;
      background-color: $color-warning;
      opacity: 0.2;
      padding: 10px;
      border-radius: 50%;
      transition: all .5s;
    }
    .action:hover{
      opacity: 1;
    }

  }
</style>
