<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="selectTag" :label="labelField" :collapseTags="collapseTags" @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'
  import {Action} from 'vuex-class'

  @Component({components: {CcInputTags}})
  export default class CcInputDialog extends Vue {
    /*vue-props*/
    @Prop() public dialog: any
    @Prop(String) public title: string
    @Prop({type: [Array, Object]}) public value: any | any[]
    @Prop({default: 'id'}) public valueField: string
    @Prop({default: 'name'}) public labelField: string
    @Prop(Boolean) public collapseTags: boolean
    @Prop(Boolean) public multiSelect: boolean
    /*vue-vuex*/
    @Action public formAction: (params: {url: string, params?: any}) => Promise<ActionReturn>
    /*vue-data*/
    public selectData: any | any[] = []
    public selectTag: any[] = []
    public rows: any[] = []
    /*vue-compute*/

    /*vue-watch*/
    @Watch('value')
    public valueChange(val: any) {
      this.updateSelectTag()
    }
    @Watch('dialog', {immediate: true})
    public dialogChange(val: any) {
      if (val && val.name && this.rows.length === 0) {
        this.getTableData(val.name)
      }
    }

    @Watch('multiSelect')
    public multiChange(val: boolean) {
      if (val && this.value && !Array.isArray(this.value)) {
        this.$emit('input', [this.value])
      }
      if (!val && this.value && Array.isArray(this.value)) {
        this.$emit('input', this.value[0])
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
    public async getTableData(name: string) {
      const {data} = await this.formAction({url: 'search' + name, params: {pageSize: 0}})
      if (data) {
        this.rows = data.rows
        this.updateSelectTag()
      }
    }
    public updateSelectTag() {
      if (this.value) {
        if (typeof this.value === 'string') {
          this.selectTag = this.rows.filter((row: any) => row[this.valueField] === this.value)
        } else {
          this.selectTag = this.rows.filter((row: any) => this.value.includes(row[this.valueField]))
        }
      } else {
        this.selectTag = []
      }
    }
    // 显示弹窗
    public show() {
      if (this.dialog) {
        this.selectData = JSON.parse(JSON.stringify(this.selectTag))
        this.$utils.dialog(this.title, (h: any) => <div>
          <cc-crud data={this.dialog} type='dialog'
                   value={this.selectData}
                   multiSelect={this.multiSelect}
                   onRowClick={this.rowClick}
                   onInput={this.onChange}></cc-crud>
          {this.multiSelect && <div class='action'>
            <el-button type='primary' onClick={this.select}>选择</el-button>
          </div>}
        </div>)
      }
    }
    // 删除标签
    public delTag(item: any) {
      if (Array.isArray(this.selectTag)) {
        const index = this.selectTag.findIndex((tag: any) => tag[this.valueField] = item[this.valueField])
        this.selectTag.splice(index, 1)
      } else {
        this.selectTag = []
      }
    }
    public onChange(val: any | any[]) {
      this.selectData = val
    }
    public rowClick() {
      setTimeout(() => this.select(), 0)
    }
    // 点击选择按钮
    public select() {
      // console.log(this.selectData)
      let re: any = {}
      if (Array.isArray(this.selectData)) {
        re = this.selectData.map((row: any) => {
          const tag: any = {}
          tag[this.valueField] = row[this.valueField]
          tag[this.labelField] = row[this.labelField]
          return tag
        })
        this.$emit('input', re.map((item: any) => item[this.valueField]))
      } else {
        re[this.valueField] = this.selectData[this.valueField]
        re[this.labelField] = this.selectData[this.labelField]
        this.$emit('input', re[this.valueField])
      }
      this.$utils.hideDialog()
    }
  }
</script>

<style lang="scss" scoped>
</style>