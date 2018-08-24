/**
 * Created by 熊超超 on 2018/6/21.
 */
import { Component, Vue } from 'vue-property-decorator'
import {Getter, State} from 'vuex-class'

@Component
export class BaseMixin extends Vue {
  loading = false
  @Getter nav
  get pageTitle () {
    return this.nav && this.nav.length ? this.nav[this.nav.length - 1].name : ''
  }
}

@Component
export class TabMixin extends Vue {
  @State((state) => state.common.selectedTab) selectedTab
  @Getter flatMenu
  pageId = ''
  created () {
    this.pageId = this.selectedTab
    if (this.$route.name === 'page') {
      this.$bus.$on('removePage', (id) => {
        this.destroy && this.destroy(id)
      })
    }
    this.$bus.$on('remove', (id) => {
      debugger
      const menu = this.flatMenu.find(m => m.id === id)
      if (menu && menu.url.indexOf('/baseData/page/') === 0) {
        this.$bus.$emit('removePage', id)
        return
      }
      if (id === this.pageId) {
        let delCache = true
        if (this.destroy) {
          delCache = this.destroy(id)
        }
        if (delCache) {
          this.$utils.destroyAndRemoveCache(this)
        }
      }
    })
  }
  destroyed () {
    this.$bus.$off('removePage')
    this.$bus.$off('remove')
    this.$bus.$off('refresh')
  }
  deactivated () {
    this.$bus.$on('refresh', (id) => {
      if (id === this.pageId) {
        if (this.refresh) {
          this.refresh()
        } else {
          this.getData && this.getData()
        }
        this.$bus.$off('refresh')
      }
    })
  }
}

@Component
export class PageMixin extends Vue {
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
