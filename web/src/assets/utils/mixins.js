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
    // 注册一个remove事件，处理当tab页关闭的时候缓存的清理
    this.$bus.$off('remove')
    this.$bus.$on('remove', (id) => {
      const menu = this.flatMenu.find(m => m.id === id)
      // 当页面是crud页面的时候，发送removePage事件，移除page页面里面的缓存
      if (menu && menu.url.indexOf('/baseData/page/') === 0) {
        this.$bus.$emit('removePage', id)
      } else {
        // 其它页面发送removeTab+页面id事件，移除tab页的缓存
        this.$bus.$emit('removeTab' + id)
      }
    })
    // 注册事件，page页面的时候，注册removePage事件，因为所有的crud页面公用page页，
    // 所以这个时候不应该删除page页，交给page组件自己的destroy方法去处理page里面维护的缓存
    // 而其他的页面就可以自己删除缓存病销毁
    if (this.$route.name === 'page') {
      this.$bus.$off('removePage')
      this.$bus.$on('removePage', (id) => {
        this.destroy && this.destroy(id)
      })
    } else {
      this.$bus.$on('removeTab' + this.pageId, () => {
        let delCache = true
        if (this.destroy) {
          delCache = this.destroy()
        }
        if (delCache) {
          this.$utils.destroyAndRemoveCache(this)
        }
      })
    }
  }
  destroyed () {
    this.$bus.$off('removeTab' + this.pageId)
  }
  deactivated () {
    this.$bus.$off('refresh')
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
