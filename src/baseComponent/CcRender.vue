<!--Created by 熊超超 on 2018/5/21.-->
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class CcRender extends Vue {
    @Prop(Function) public renderFun: any
    @Prop() public scope?: any
    @Prop() public column: any

    public render(h: any) {
      if (this.renderFun) {
        return this.renderFun(h)
      }
      const scope = this.scope
      if (this.column.renderCell) {
        if (scope) {
          return this.column.renderCell(h, scope.row[scope.column['property']], scope.row, scope.$index, scope.column, scope.store)
        } else {
          return this.column.renderCell(h)
        }
      } else {
        let value = scope.row[scope.column['property']]
        if (this.column.formProps && this.column.formProps.options) {
          let rows: any = this.column.formProps.options
          let labelField = 'label'
          let valueField = 'value'
          if (['table', 'tree'].includes(this.column.formProps.type)) {
            labelField = this.column.formProps.props && this.column.formProps.props.labelField || 'name'
            valueField = this.column.formProps.props && this.column.formProps.props.valueField || 'id'
          }
          value = Array.isArray(value) ? value : [value]
          if (this.column.formProps.type === 'table') {
            rows = this.column.formProps.options.rows
          } else if (this.column.formProps.type === 'tree') {
            rows = this.$utils.flatObject(this.column.formProps.options)
          }
          value = rows
            .filter((row: any) => value.includes(row[valueField]))
            .map((row: any) => row[labelField] || row.id).join(',')
        }
        return h('span', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>