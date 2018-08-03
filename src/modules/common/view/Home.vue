<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="home">
    <grid-layout v-if="userDashboard.length"
                 :layout="userDashboard"
                 :col-num="colNum"
                 :row-height="rowHight"
                 :is-draggable="true"
                 :is-resizable="true"
                 :is-mirrored="false"
                 :vertical-compact="true"
                 :use-css-transforms="true"
                 @layout-updated="layoutUpdated = true"
    >
      <grid-item v-for="item in userDashboard"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i"
                 dragIgnoreFrom=".ignore">
        <dashboard-item :dashboard="item.dashboard" :size="{w: item.w, h: item.h * rowHight + 10 * (item.h - 1) - 60}"></dashboard-item>
      </grid-item>
    </grid-layout>
    <div :class="['action', {'save': layoutUpdated}]" @click="action">
      <cc-icon name="layout" class="c-white" v-if="!layoutUpdated"></cc-icon>
      <cc-icon name="save" class="c-white" v-if="layoutUpdated"></cc-icon>
    </div>
  </div>
</template>

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'
  import VueGridLayout from 'vue-grid-layout'
  import DashboardItem from '../fragment/DashboardItem.vue'
  import {Action} from 'vuex-class'
  import DashboardSelector from '../fragment/DashboardSelector.vue'
  import {Route} from 'vue-router'

  Component.registerHooks(['beforeRouteLeave'])

  @Component({components: {GridLayout: VueGridLayout.GridLayout, GridItem: VueGridLayout.GridItem, DashboardItem}})
  export default class Home extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action public getUserDashboard: () => Promise<ActionReturn>
    @Action public saveUserDashboard: (list: any[]) => Promise<ActionReturn>
    /*vue-data*/
    public rowHight: number = 30
    public colNum: number = 8
    public userDashboard: UserDashboard[] = []
    public layoutUpdated: boolean = false
    /*vue-compute*/
    get selected() {
      return this.userDashboard.map((userDashboard: UserDashboard) => userDashboard.dashboard.id)
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    public async beforeRouteLeave(to: Route, from: Route, next: any) {
      if (this.layoutUpdated) {
        this.$utils.beforeRouteLeave(to, from, next)
      } else {
        next()
      }
    }
    /*vue-method*/
    public async save() {
      const list: any[] = []
      this.userDashboard.forEach((userDashboard: UserDashboard) => {
        const clone: any = {...userDashboard}
        clone.dashboardId = userDashboard.dashboard.id
        list.push(clone)
      })
      const {data} = await this.saveUserDashboard(list)
      if (data) {
        this.$utils.message('保存成功！')
        this.layoutUpdated = false
      }
    }
    public async initData() {
      const {data} = await this.getUserDashboard()
      if (data && data.length) {
        // 返回的是用户的dashboard配置数据，直接赋值给userDashboard
        if (data[0].dashboard) {
          this.userDashboard = data
        } else {
          this.dashboard2UserDashboard(data)
        }
      }
    }
    public dashboard2UserDashboard(dashboard: Dashboard[]) {
      this.userDashboard = []
      // 用户没有配置dashboard，后端返回默认的几个dashboard，需要转成userDashboard
      let startX = 0
      let startY = 0
      dashboard.forEach((dashboard: Dashboard, index: number) => {
        // 先根据类型定义宽和高
        let w: number = 2
        let h: number = 3
        if (dashboard.type !== this.$c.DashboardTypeV.信息面板) {
          w = 4
          h = 8
        }
        // 计算位置
        const {x, y} = this.getLocation(startX, startY, w, h)
        this.userDashboard.push({x, y, w, h, i: index + '', dashboard})
        startX = x + w
        startY = y
      })
    }
    // 计算仪表盘的摆放位置的算法：从坐标为0，0的地方开始摆放第一个dashboard，后面的就从紧挨着前一个的位置开始，
    // 以需要摆放的dashboard的宽高构建一个矩形区域，然后判断已经有dashboard和这个区域重叠，如果没有，就可以摆放
    // 如果重叠，那么这个区域往后移动一个坐标，再次判断，直到区域可用
    // 移动的方式是，先沿着x轴移动，x轴不能移动后（x+宽度>总宽度），再往y轴移动
    public getLocation(startX: number, startY: number, w: number, h: number): {x: number, y: number} {
      const userDashboard: UserDashboard[] = this.userDashboard
      if (userDashboard.length) {
        // 看x轴方向是否能往后移动
        if (startX + w > this.colNum) {
          startY ++
          startX = 0
        }
        // 判断是否有dashboard的左上角的坐标落在了目标区域内
        const dashboard = userDashboard.find((ud: UserDashboard) => {
          return ud.x >= startX && ud.x <= startX + w && ud.y >= startY && ud.y <= startY + h
        })
        if (dashboard) {
          // 移动一格
          startX ++
          return this.getLocation(startX, startY, w, h)
        }
      }
      return {x: startX, y: startY}
    }
    // 所有的
    public action() {
      if (this.layoutUpdated) {
        this.save()
      } else {
        // 这个方法里注释的部分是为了示范在jsx中使用slot-scope
        // const scopedSlots: any = {
        //   default: (props: any) => <div>{props.text}</div>,
        // }
        this.$utils.dialog(`选择要显示的内容`,
          (h: any) => <DashboardSelector /*scopedSlots={scopedSlots}*/ onSelected={this.onSelected} value={this.selected}>
          </DashboardSelector>,
        )
      }
    }
    public onSelected(dashboards: Dashboard[]) {
      this.dashboard2UserDashboard(dashboards)
      this.save()
      this.$utils.hideDialog()
    }
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
      position: fixed;
      right: 16px;
      bottom: 16px;
      background-color: $color-warning;
      opacity: 0.2;
      padding: 10px;
      border-radius: 50%;
      transition: all .5s;
    }
    .action.save{
      background-color: $color-danger;
      opacity: 1;
    }
    .action:hover{
      opacity: 1;
    }
  }
</style>
