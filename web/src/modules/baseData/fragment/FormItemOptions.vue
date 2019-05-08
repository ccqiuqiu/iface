<!--Created by 熊超超 on 2018/6/13.-->
<template>
  <div v-if="item && needOptions">
    <el-radio-group v-model="sourceType" class="m-v-10" @change="onChange">
      <el-radio :label="2">系统内置</el-radio>
      <el-radio :label="1">自定义</el-radio>
      <el-radio :label="3">接口</el-radio>
    </el-radio-group>
    <el-input @blur="onChange" v-model="source1" v-if="sourceType === 1" type="textarea" :autosize="{ minRows: 4}" placeholder="输入json格式的数据"></el-input>
    <el-select v-if="sourceType === 2" v-model="source2" placeholder="请选择" @change="onChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input @blur="onChange" v-model="source3" v-if="sourceType === 3" type="text" placeholder="输入以'/'开头的接口地址"></el-input>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

const optionsDefaultData = (type) => {
  if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(type)) {
    return [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
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
              label: '天河区'
            },
            {
              value: 2,
              label: '番禺区'
            }
          ]
        }]
      },
      {
        value: 2,
        label: '湖北省',
        children: [
          {
            value: 1,
            label: '武汉市'
          }
        ]
      }
    ]
  } else if (type === 'table') {
    return {
      columns: [
        { prop: 'id', label: '编号' },
        { prop: 'name', label: '名称' }
      ],
      rows: [
        { id: 1, name: '用户1' },
        { id: 2, name: '用户2' }
      ]
    }
  } else if (type === 'tree') {
    return [
      {
        name: '一级1',
        id: 1,
        children: [
          {
            name: '二级1-1',
            id: 11
          }
        ]
      },
      {
        name: '二级2',
        id: 2,
        children: [
          {
            name: '二级2-1',
            id: 21
          }
        ]
      }
    ]
  } else if (type === 'dialog') {
    return {
      title: '用户管理',
      name: 'User',
      items: [
        {
          label: '编号',
          prop: 'id',
          target: ['table']
        },
        {
          label: '姓名',
          prop: 'name',
          target: ['table', 'searchForm', 'editForm'],
          formProps: {
            type: 'text',
            verify: {
              number: true
            }
          }
        }
      ],
      searchForm: {
        model: {}
      },
      editForm: {
        model: {}
      },
      table: {
        rows: []
      },
      needQuery: true
    }
  }
}

export default @Component class FormItemOptions extends Vue {
  /* vue-props */
  @Prop() item
  @Prop(Boolean) needOptions
  /* vue-vuex */
  /* vue-data */
  sourceType = 2
  source1 = ''
  source2 = ''
  source3 = ''
  dialogOptions = [{ label: '资源管理', value: 'resource' }]
  /* vue-compute */
  get options () {
    if (this.item.type === 'dialog') {
      return this.dialogOptions
    }
    return this.$c.OptionsDataSource.filter((item) => {
      if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(this.item.type)) {
        return item.type === 'keyValue'
      }
      return item.type === this.item.type
    })
  }
  /* vue-watch */
  @Watch('item')
  itemChange (val, old) {
    if (val && (!old || old.options !== val.options)) {
      if (val.options && typeof val.options === 'object') {
        this.sourceType = 1
        this.source1 = JSON.stringify(val.options || optionsDefaultData(this.item.type))
        this.source2 = ''
        this.source3 = ''
      } else if (val.options && typeof val.options === 'string' && val.options.indexOf('/') === 0) {
        this.sourceType = 3
        this.source1 = ''
        this.source2 = ''
        this.source3 = val.options
      } else {
        this.sourceType = 2
        this.source1 = ''
        this.source2 = val.options
        this.source3 = ''
      }
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  onChange () {
    if (this.sourceType === 1) {
      try {
        const json = this.source1 ? JSON.parse(this.source1) : optionsDefaultData(this.item.type)
        this.item.options = json
      } catch (e) {
        console.log(e.message)
      }
    } else if (this.sourceType === 2) {
      this.item.options = this.source2
    } else {
      this.item.options = this.source3
    }
    this.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-select{
    width: 100%;
  }
  /deep/ .el-radio + .el-radio{
    margin-left: 10px;
  }
</style>
