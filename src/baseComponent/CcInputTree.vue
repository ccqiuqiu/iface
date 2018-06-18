<!--Created by 熊超超 on 2018/5/31.-->
<template>
  <div>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <el-tree ref="tree" :data="options" :show-checkbox="showCheckbox"
               :highlight-current="true"
               :default-expanded-keys="selectedKeys"
               :node-key="valueField"
               check-on-click-node
               check-strictly
               @check-change="checkChange"
      ></el-tree>
    </el-popover>
    <cc-input-tags v-popover:popover v-model="getSelectTag" @del="delTag" icon="tree"/>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import CcInputTags from './CcInputTags.vue'

@Component({components: {CcInputTags}})
export default class CcInputTree extends Vue {
  /* vue-props */
  @Prop({type: [String, Number, Array]}) value
  @Prop(Array) options
  @Prop({default: 'id'}) valueField
  @Prop({default: false}) showCheckbox

  /* vue-vuex */
  /* vue-data */
  show = false
  selectedKeys = []

  /* vue-compute */
  get multi () {
    return this.showCheckbox
  }

  get flatData () {
    return this.$utils.flatObject(this.options)
  }

  get getSelectTag () {
    return this.flatData.filter((item) => this.selectedKeys.includes(item[this.valueField]))
  }

  /* vue-watch */
  @Watch('selectedKeys')
  selectedKeysChange (val) {
    if (this.multi) {
      this.$emit('input', val)
    } else {
      this.$emit('input', val[0])
    }
  }

  // 监听value是为了实现重置表单的时候，能更新树
  @Watch('value')
  valueChange () {
    this.init()
  }

  /* vue-lifecycle */
  mounted () {
    this.init()
  }

  /* vue-method */
  init () {
    if (this.value) {
      if (this.multi) {
        this.$refs.tree.setCheckedKeys(this.value)
        this.selectedKeys = this.value
      } else {
        this.$refs.tree.setCurrentKey(this.value)
        this.selectedKeys = [this.value]
      }
    }
  }

  // 树选中节点变化的时候
  checkChange (node) {
    if (this.multi) {
      this.selectedKeys = this.$refs.tree.getCheckedKeys()
    } else {
      this.show = false
      this.selectedKeys = [this.$refs.tree.getCurrentKey()]
    }
  }

  // 点击标签删除按钮的时候
  delTag (node) {
    if (this.multi) {
      const index = this.selectedKeys.findIndex((item) => item === node[this.valueField])
      if (index > -1) {
        this.selectedKeys.splice(index, 1)
      } else {
        this.selectedKeys.push(node[this.valueField])
      }
      this.$refs.tree.setCheckedKeys(this.selectedKeys)
    } else {
      this.$refs.tree.setCurrentKey(null)
      this.selectedKeys = []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
