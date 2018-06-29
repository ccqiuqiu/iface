<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="getSelectTag" :label="labelField"  @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputDialog extends Vue {
    /*vue-props*/
    @Prop() public dialog: any
    @Prop() public title: string
    @Prop({type: [Array, Object]}) public value: any | any[]
    @Prop({default: 'id'}) public valueField: string
    @Prop({default: 'name'}) public labelField: string
    @Prop(Boolean) public multiSelect: boolean
    /*vue-vuex*/
    /*vue-data*/
    public selectData: any | any[]
    /*vue-compute*/
    get getSelectTag() {
      return this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : []
    }

    /*vue-watch*/
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
    // 显示弹窗
    public show() {
      if (this.dialog) {
        this.selectData = JSON.parse(JSON.stringify(this.getSelectTag))
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
      if (Array.isArray(this.value)) {
        const index = this.value.findIndex((tag: any) => tag[this.valueField] = item[this.valueField])
        this.value.splice(index, 1)
      } else {
        this.$emit('input', null)
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
      let re: any = {}
      if (Array.isArray(this.selectData)) {
        re = this.selectData.map((row: any) => {
          const tag: any = {}
          tag[this.valueField] = row[this.valueField]
          tag[this.labelField] = row[this.labelField]
          return tag
        })
      } else {
        re[this.valueField] = this.selectData[this.valueField]
        re[this.labelField] = this.selectData[this.labelField]
      }
      this.$emit('input', re)
      this.$utils.hideDialog()
    }
  }
</script>

<style lang="scss" scoped>
</style>