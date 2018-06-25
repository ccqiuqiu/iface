<!--Created by 熊超超 on 2018/6/13.-->
<template>
  <div v-if="item && needOptions">
    <el-radio-group v-model="source" class="m-v-10" @change="onSourceChange">
      <el-radio :label="1">自定义数据</el-radio>
      <el-radio :label="2">使用数据源</el-radio>
    </el-radio-group>
    <el-input @blur="onBlur" v-model="source1" v-if="source === 1" type="textarea" :autosize="{ minRows: 4}" placeholder="输入json格式的数据"></el-input>
    <el-select v-else v-model="source2" placeholder="请选择" @change="onChange">
      <el-option v-for="item in source2Options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class FormItemOptions extends Vue {
    /*vue-props*/
    @Prop() private item: FormItem
    @Prop(Boolean) private needOptions: boolean
    /*vue-vuex*/
    /*vue-data*/
    private source: number = 0
    private source1: string = ''
    private source2: string = ''
    private source2Options: OptionItem[] = [
      {label: '性别', value: 'sex'},
      {label: '状态', value: 'status'},
    ]
    /*vue-compute*/
    /*vue-watch*/
    @Watch('item')
    private itemChange(val: any) {
      if (val && val.options) {
        if (typeof val.options === 'string') {
          this.source = 2
          this.source2 = val.options
        } else {
          this.source = 1
          this.source1 = JSON.stringify(val.options)
        }
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
    private onSourceChange(val: number) {
      this.onBlur()
      this.onChange()
    }
    private onBlur() {
      if (this.source === 1) {
        try {
          const json = JSON.parse(this.source1)
          this.item.options = json
        } catch (e) {
          console.log(e.message)
        }
        this.$emit('change')
      }
    }
    private onChange() {
      if (this.source === 2) {
        this.item.options = this.source2
        this.$emit('change')
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-select{
    width: 100%;
  }
</style>
