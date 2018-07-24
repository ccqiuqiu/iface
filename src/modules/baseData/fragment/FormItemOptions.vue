<!--Created by 熊超超 on 2018/6/13.-->
<template>
  <div v-if="item && needOptions">
    <el-radio-group v-model="source" class="m-v-10" @change="onSourceChange">
      <el-radio :label="2">使用数据源</el-radio>
      <el-radio :label="1">自定义数据</el-radio>
    </el-radio-group>
    <el-input @blur="onBlur" v-model="source1" v-if="source === 1" type="textarea" :autosize="{ minRows: 4}" placeholder="输入json格式的数据"></el-input>
    <el-select v-else v-model="source2" placeholder="请选择" @change="onChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  const optionsDefaultData = (type: string) => {
    if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(type)) {
      return [
        {label: '选项1', value: 1},
        {label: '选项2', value: 2},
      ]
    } else if (type === 'cascader') {
      return [
        {
          value: 1,
          label: '广东省',
          children: [{
            value: 2,
            label: '广州市',
            children: [
              {
                value: 1,
                label: '天河区',
              },
              {
                value: 2,
                label: '番禺区',
              },
            ],
          }],
        },
        {
          value: 2,
          label: '湖北省',
          children: [
            {
              value: 1,
              label: '武汉市',
            },
          ],
        },
      ]
    } else if (type === 'table') {
      return {
        columns: [
          {prop: 'id', label: '编号'},
          {prop: 'name', label: '名称'},
        ],
        rows: [
          {id: 1, name: '用户1'},
          {id: 2, name: '用户2'},
        ],
      }
    } else if (type === 'tree') {
      return [
        {
          name: '一级1',
          id: 1,
          children: [
            {
              name: '二级1-1',
              id: 11,
            },
          ],
        },
        {
          name: '二级2',
          id: 2,
          children: [
            {
              name: '二级2-1',
              id: 21,
            },
          ],
        },
      ]
    } else if (type === 'dialog') {
      return {
        title: '用户管理',
        name: 'User',
        items: [
          {
            label: '编号',
            prop: 'id',
            target: ['table'],
          },
          {
            label: '姓名',
            prop: 'name',
            target: ['table', 'searchForm', 'editForm'],
            formProps: {
              type: 'text',
              verify: {
                number: true,
              },
            },
          },
        ],
        searchForm: {
          model: {},
        },
        editForm: {
          model: {},
        },
        table: {
          rows: [],
        },
        needQuery: true,
      }
    }
  }

  @Component
  export default class FormItemOptions extends Vue {
    /*vue-props*/
    @Prop() public item: FormItem
    @Prop(Boolean) public needOptions: boolean
    /*vue-vuex*/
    /*vue-data*/
    public source: number = 2
    public source1: string = ''
    public source2: string = ''
    public dialogOptions = [{label: '资源管理', value: 'resource'}]
    /*vue-compute*/
    get options() {
      if (this.item.type === 'dialog') {
        return this.dialogOptions
      }
      return this.$c.OptionsDataSource.filter((item) => {
        if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(this.item.type as string)) {
          return item.type === 'keyValue'
        }
        return item.type === this.item.type
      })
    }
    /*vue-watch*/
    @Watch('item')
    public itemChange(val: any, old: any) {
      if (val) {
        if (!val.options || typeof val.options === 'string' || typeof val.options === 'number') {
          this.source = 2
          this.source2 = val.options
          this.source1 = ''
        } else {
          this.source = 1
          this.source1 = JSON.stringify(val.options || optionsDefaultData(this.item.type as string))
          this.source2 = ''
        }
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
    public onSourceChange(val: number) {
      this.onBlur()
      this.onChange()
    }
    public onBlur() {
      if (this.source === 1) {
        try {
          const json = this.source1 ? JSON.parse(this.source1) : optionsDefaultData(this.item.type as string)
          this.item.options = json
        } catch (e) {
          console.log(e.message)
        }
        this.$emit('change')
      }
    }
    public onChange() {
      if (this.source === 2) {
        this.item.options = this.source2 + ''
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
