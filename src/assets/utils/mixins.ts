/**
 * Created by 熊超超 on 2018/6/21.
 */
import { Component, Vue } from 'vue-property-decorator'
import {Getter} from 'vuex-class'

@Component
export class BaseMixin extends Vue {
  public loading: boolean = false
  @Getter public nav: Menu[]
  get pageTitle() {
    return this.nav && this.nav.length ? this.nav[this.nav.length - 1].name : ''
  }
}

@Component
export class PageMixin extends Vue {
  public layout: string = 'total, sizes, prev, pager, next, jumper'
  public pageSize: number = 10
  public pageNum: number = 1
  public rows: any[] = []
  public total: number = 0
  public selectedRows: any[] = []
  public currentRow: any = null

  public created() {
    this.getData()
  }
  // pageNum改变的时候的事件
  public pageNumChange(pageNum: number) {
    this.pageNum = pageNum
    this.getData()
  }
  // pageSize改变的时候的事件
  public pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.getData()
  }
}

