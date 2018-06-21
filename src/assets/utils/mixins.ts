/**
 * Created by 熊超超 on 2018/6/21.
 */
import { Component, Vue } from 'vue-property-decorator'
import {Getter} from 'vuex-class'

@Component
export class BaseMixin extends Vue {
  private loading: boolean = false
  @Getter private nav: Menu[]
  get pageTitle() {
    return this.nav && this.nav.length ? this.nav[this.nav.length - 1].name : ''
  }
}

@Component
export class PageMixin extends Vue {
  private layout: string = 'total, sizes, prev, pager, next, jumper'
  private pageSize: number = 10
  private pageNum: number = 1
  private rows: User[] = []
  private total: number = 0
  private selectedRows: User[] = []
  private currentRow: User = {}

  private created() {
    this.getData()
  }
  // pageNum改变的时候的事件
  private pageNumChange(pageNum: number) {
    this.pageNum = pageNum
    this.getData()
  }
  // pageSize改变的时候的事件
  private pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.getData()
  }
}

