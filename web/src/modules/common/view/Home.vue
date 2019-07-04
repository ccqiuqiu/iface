<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="home full">
    <grid-layout ref="gridLayout" v-if="userDashboard.length"
                 :layout="userDashboard"
                 :col-num="colNum"
                 :row-height="rowHight"
                 :is-draggable="true"
                 :is-resizable="true"
                 :is-mirrored="false"
                 :vertical-compact="true"
                 :use-css-transforms="true"
                 @layout-updated="onLayoutUpdated"
    >
      <grid-item v-for="item in userDashboard"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.id"
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

<script>
import { Component, Mixins, Watch } from 'vue-property-decorator'
import VueGridLayout from 'vue-grid-layout'
import DashboardItem from '../fragment/DashboardItem.vue'
import { Action, State } from 'vuex-class'
import DashboardSelector from '../fragment/DashboardSelector.vue'
import { TabMixin } from '../../../assets/utils/mixins'

Component.registerHooks(['beforeRouteLeave'])

export default @Component({ components: { GridLayout: VueGridLayout.GridLayout, GridItem: VueGridLayout.GridItem, DashboardItem } })
class Home extends Mixins(TabMixin) {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menuExpand) menuExpand
  @Action getUserDashboard
  @Action saveUserDashboard
  /* vue-data */
  rowHight = 30
  colNum = 8
  userDashboard = []
  userDashboardClone = []
  layoutUpdated = false
  /* vue-compute */
  /* vue-watch */
  @Watch('menuExpand')
  menuExpandWatch () {
    // 解决左侧菜单展开缩起的时候，首页的grid-layout不会自适应宽度的问题
    // 可能是grid-layout的bug，暂时用这种方式解决，后面跟进一下，看看grid-layout库会不会修复
    setTimeout(() => {
      this.contentDom = this.contentDom || document.querySelector('.tab-view')
      this.gridDom = this.gridDom || document.querySelector('.vue-grid-layout')
      this.gridDom.style.width = this.contentDom.clientWidth + 'px'
    }, 500)
  }
  /* vue-lifecycle */
  created () {
    this.initData()
  }
  async beforeRouteLeave (to, from, next) {
    if (this.layoutUpdated) {
      this.$utils.beforeRouteLeave(to, from, next)
    } else {
      next()
    }
  }
  /* vue-method */
  async save () {
    const list = []
    this.userDashboard.forEach((userDashboard) => {
      const clone = { ...userDashboard }
      clone.dashboardId = userDashboard.dashboard.id
      list.push(clone)
    })
    const { data } = await this.saveUserDashboard(list)
    if (data) {
      this.$utils.message('保存成功！')
      this.userDashboardClone = JSON.parse(JSON.stringify(this.userDashboard))
      this.layoutUpdated = false
    }
  }
  async initData () {
    const { data } = await this.getUserDashboard()
    if (data && data.length) {
      // 返回的是用户的dashboard配置数据，直接赋值给userDashboard
      if (data[0].dashboard) {
        this.userDashboard = data
      } else {
        this.dashboard2UserDashboard(data)
      }
      this.userDashboard.forEach(u => (u.moved = false))
      this.userDashboardClone = JSON.parse(JSON.stringify(this.userDashboard))
    }
  }
  dashboard2UserDashboard (dashboard) {
    this.userDashboard = []
    // 用户没有配置dashboard，后端返回默认的几个dashboard，需要转成userDashboard
    let startX = 0
    let startY = 0
    dashboard.forEach((dashboard, index) => {
      // 先根据类型定义宽和高
      let w = 2
      let h = 3
      if (dashboard.type !== this.$c.DashboardTypeV.信息面板) {
        w = 4
        h = 8
      }
      // 计算位置
      const { x, y } = this.getLocation(startX, startY, w, h)
      this.userDashboard.push({ x, y, w, h, i: index + '', dashboard })
      startX = x + w
      startY = y
    })
  }
  // 计算仪表盘的摆放位置的算法：从坐标为0，0的地方开始摆放第一个dashboard，后面的就从紧挨着前一个的位置开始，
  // 以需要摆放的dashboard的宽高构建一个矩形区域，然后判断已经有dashboard和这个区域重叠，如果没有，就可以摆放
  // 如果重叠，那么这个区域往后移动一个坐标，再次判断，直到区域可用
  // 移动的方式是，先沿着x轴移动，x轴不能移动后（x+宽度>总宽度），再往y轴移动
  getLocation (startX, startY, w, h) {
    const userDashboard = this.userDashboard
    if (userDashboard.length) {
      // 看x轴方向是否能往后移动
      if (startX + w > this.colNum) {
        startY++
        startX = 0
      }
      // 判断是否有dashboard和目标位置相交（中心点X的相对距离<宽度和的一半 && 中心点Y点距离<高度和的一半）
      const center = {
        x: startX + w / 2,
        y: startY + h / 2
      }
      const dashboard = userDashboard.find((ud) => {
        const centerTemp = {
          x: ud.x + ud.w / 2,
          y: ud.y + ud.h / 2
        }
        const xl = Math.abs(center.x - centerTemp.x)
        const yl = Math.abs(center.y - centerTemp.y)
        return xl < (w + ud.w) / 2 && yl < (h + ud.h) / 2
      })
      if (dashboard) {
        // 移动一格
        startX++
        return this.getLocation(startX, startY, w, h)
      }
    }
    return { x: startX, y: startY }
  }
  // 所有的
  action () {
    if (this.layoutUpdated) {
      this.save()
    } else {
      // 这个方法里注释的部分是为了示范在jsx中使用slot-scope
      // const scopedSlots = {
      //   default: (props) => <div>{props.text}</div>,
      // }
      this.$utils.dialog(`选择要显示的内容`,
        (h) => <DashboardSelector /* scopedSlots={scopedSlots} */ onSelected={this.onSelected} value={this.selected}>
        </DashboardSelector>
      )
    }
  }
  onSelected (dashboards) {
    this.dashboard2UserDashboard(dashboards)
    this.save()
    this.$utils.hideDialog()
  }
  onLayoutUpdated () {
    if (JSON.stringify(this.userDashboardClone) !== JSON.stringify(this.userDashboard)) {
      this.layoutUpdated = true
    } else {
      this.layoutUpdated = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
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
