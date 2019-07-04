/**
 * Created by 熊超超 on 2018/6/21.
 */
import { Component, Vue, Provide } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component class BaseMixin extends Vue {
  loading = false
  @Getter nav
  get pageTitle () {
    return this.nav && this.nav.length ? this.nav[this.nav.length - 1].name : ''
  }
}

@Component class PageMixin extends Vue {
  layout = 'total, sizes, prev, pager, next, jumper'
  pageSize = 10
  pageNum = 1
  rows = []
  total = 0
  selectedRows = []
  currentRow = null

  created () {
    this.getData()
  }
  // pageNum改变的时候的事件
  pageNumChange (pageNum) {
    this.pageNum = pageNum
    this.getData()
  }
  // pageSize改变的时候的事件
  pageSizeChange (pageSize) {
    this.pageSize = pageSize
    this.getData()
  }
}

@Component class TabMixin extends Vue {
  @Provide() tabId = this.$parent['name']
  @Provide() params = this.$tab.getParams(this.$parent['name'])
  @Provide() query = this.$tab.getQuery(this.$parent['name'])

  created () {
    // 注册刷新数据的监听
    this.$bus.$on('refresh-' + this.tabId, (type = this.$c.RefreshType.自动) => {
      if (type === this.$c.RefreshType.更新数据) {
        this.getData && this.getData()
      } else if (type === this.$c.RefreshType.重载页面) {
        this.reLoad && this.reLoad()
      } else if (type === this.$c.RefreshType.刷新标签) {
        this.$tab.refresh(this.tabId)
      } else {
        // 自动的情况，按照reLoad, this.$tab.refresh的优先级执行
        if (this.reLoad) {
          this.reLoad()
        } else {
          this.$tab.refresh(this.tabId)
        }
      }
    })
  }
  destroyed () {
    // 取消刷新数据的监听
    this.$bus.$off('refresh-' + this.tabId)
  }
}
export {BaseMixin, PageMixin, TabMixin}
