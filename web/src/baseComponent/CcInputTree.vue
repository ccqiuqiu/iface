<!--Created by 熊超超 on 2018/5/31.-->
<template>
  <div>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <el-tree ref="tree" :data="options"
               :show-checkbox="multiSelect" v-on="$listeners"
               :highlight-current="true"
               :default-expanded-keys="selectedKeys"
               :node-key="valueField"
               check-on-click-node
               :props="props"
               v-if="forceUpdate"
               v-bind="$attrs"
               @check-change="checkChange"
      ></el-tree>
    </el-popover>
    <cc-input-tags v-popover:popover :label="labelField" :placeholder="placeholder" v-model="getSelectTag" @del="delTag" icon="tree"/>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcInputTags from './CcInputTags.vue'

export default @Component({ components: { CcInputTags } }) class CcInputTree extends Vue {
  /* vue-props */
  @Prop({ type: [String, Number, Array] }) value
  @Prop({ type: Array, default: () => [] }) options
  @Prop({ type: String, default: 'children' }) childrenField
  @Prop({ type: String, default: 'id' }) valueField
  @Prop({ type: String, default: 'name' }) labelField
  @Prop(Boolean) multiSelect // 是否多选
  @Prop(String) placeholder

  /* vue-vuex */
  /* vue-data */
  forceUpdate = true
  show = false
  selectedKeys = []
  /* vue-compute */
  get props () {
    return { children: this.childrenField, label: this.labelField }
  }
  get multi () {
    return this.multiSelect
  }
  get flatData () {
    return this.$utils.flatObject(this.options)
  }
  get getSelectTag () {
    return this.flatData.filter((item) => this.selectedKeys.includes(item[this.valueField]))
  }
  /* vue-watch */
  @Watch('props')
  propsChange () {
    this.forceUpdate = false
    this.$nextTick(() => (this.forceUpdate = true))
  }
  @Watch('multi')
  multiChange (val) {
    this.forceUpdate = false
    this.$nextTick(() => (this.forceUpdate = true))
    setTimeout(() => {
      if (val && this.value && !Array.isArray(this.value)) {
        this.$emit('input', [this.value])
      }
      if (!val && this.value && Array.isArray(this.value)) {
        this.$emit('input', this.value[0])
      }
    }, 0)
  }
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
    } else {
      this.selectedKeys = []
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
