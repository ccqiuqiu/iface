<!--Created by 熊超超 on 2018/5/31.-->
<template>
  <div>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <el-tree ref="tree" :data="options" :show-checkbox="showCheckbox" v-on="$listeners"
               :highlight-current="true"
               :default-expanded-keys="selectedKeys"
               :node-key="valueField"
               check-on-click-node
               check-strictly
               :props="props"
               v-if="forceUpdate"
               @check-change="checkChange"
      ></el-tree>
    </el-popover>
    <cc-input-tags v-popover:popover :label="labelField" v-model="getSelectTag" @del="delTag" icon="tree"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputTree extends Vue {
    /*vue-props*/
    @Prop({type: [String, Number, Array]}) public value: string | number | Array<string | number>
    @Prop({type: Array, default: () => []}) public options: any[]
    @Prop({default: 'children'}) public childrenField: string
    @Prop({default: 'id'}) public valueField: string
    @Prop({default: 'name'}) public labelField: string
    @Prop({default: false}) public showCheckbox: boolean

    /*vue-vuex*/
    /*vue-data*/
    public forceUpdate: boolean = true
    public show: boolean = false
    public selectedKeys: any[] = []
    /*vue-compute*/
    get props() {
      return {children: this.childrenField, label: this.labelField}
    }
    get multi() {
      return this.showCheckbox
    }
    get flatData() {
      return this.$utils.flatObject(this.options)
    }
    get getSelectTag() {
      return this.flatData.filter((item: any) => this.selectedKeys.includes(item[this.valueField]))
    }
    /*vue-watch*/
    @Watch('props')
    public propsChange() {
      this.forceUpdate = false
      this.$nextTick(() => this.forceUpdate = true)
    }
    @Watch('selectedKeys')
    public selectedKeysChange(val: any[]) {
      if (this.multi) {
        this.$emit('input', val)
      } else {
        this.$emit('input', val[0])
      }
    }
    // 监听value是为了实现重置表单的时候，能更新树
    @Watch('value')
    public valueChange() {
      this.init()
    }
    /*vue-lifecycle*/
    public mounted() {
      this.init()
    }
    /*vue-method*/
    public init() {
      if (this.value) {
        if (this.multi) {
          (this.$refs as Vue).tree.setCheckedKeys(this.value)
          this.selectedKeys = this.value as any[]
        } else {
          (this.$refs as Vue).tree.setCurrentKey(this.value)
          this.selectedKeys = [this.value as number]
        }
      }
    }
    // 树选中节点变化的时候
    public checkChange(node: any) {
      if (this.multi) {
        this.selectedKeys = (this.$refs as Vue).tree.getCheckedKeys()
      } else {
        this.show = false
        this.selectedKeys = [(this.$refs as Vue).tree.getCurrentKey()]
      }
    }
    // 点击标签删除按钮的时候
    public delTag(node: any) {
      if (this.multi) {
        const index = this.selectedKeys.findIndex((item: any) => item === node[this.valueField])
        if (index > -1) {
          this.selectedKeys.splice(index, 1)
        } else {
          this.selectedKeys.push(node[this.valueField])
        }
        (this.$refs as Vue).tree.setCheckedKeys(this.selectedKeys)
      } else {
        (this.$refs as Vue).tree.setCurrentKey(null)
        this.selectedKeys = []
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>