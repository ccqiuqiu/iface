<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="getSelectTag" :label="textField"  @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputDialog extends Vue {
    /*vue-props*/
    @Prop() private dialog: any
    @Prop() private title: string
    @Prop({type: [Array, Object]}) private value: any | any[]
    @Prop({default: 'id'}) private valueField: string
    @Prop({default: 'text'}) private textField: string
    /*vue-vuex*/
    /*vue-data*/
    private selectData: any | any[]
    /*vue-compute*/
    get getSelectTag() {
      return this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : []
    }

    /*vue-watch*/
    /*vue-lifecycle*/

    /*vue-method*/
    // 显示弹窗
    private show() {
      this.selectData = JSON.parse(JSON.stringify(this.getSelectTag))
      this.$utils.dialog(this.title, (h: any) => <div>
        <cc-crud data={this.dialog} type='dialog' value={this.selectData} onRowClick={this.rowClick} onInput={this.onChange}></cc-crud>
        {Array.isArray(this.value) && <div class='action'>
          <el-button type='primary' onClick={this.select}>选择</el-button>
        </div>}
      </div>)
    }
    // 删除标签
    private delTag(item: any) {
      const index = this.value.findIndex((tag: any) => tag[this.valueField] = item[this.valueField])
      this.value.splice(index, 1)
    }
    private onChange(val: any | any[]) {
      this.selectData = val
    }
    private rowClick() {
      setTimeout(() => this.select(), 0)
    }
    // 点击选择按钮
    private select() {
      let re: any = {}
      if (Array.isArray(this.selectData)) {
        re = this.selectData.map((row: any) => {
          const tag: any = {}
          tag[this.valueField] = row[this.valueField]
          tag[this.textField] = row[this.textField]
          return tag
        })
      } else {
        re[this.valueField] = this.selectData[this.valueField]
        re[this.textField] = this.selectData[this.textField]
      }
      this.$emit('input', re)
      this.$utils.hideDialog()
    }
  }
</script>

<style lang="scss" scoped>
</style>