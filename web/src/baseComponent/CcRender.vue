<!--Created by 熊超超 on 2018/5/21.-->
<script>
import {Component, Vue, Prop} from 'vue-property-decorator'

export default @Component
class CcRender extends Vue {
    @Prop(Function) renderFun
    @Prop() scope
    @Prop() column

    render (h) {
      if (this.renderFun) {
        return this.renderFun(h)
      }
      const scope = this.scope
      if (this.column.renderCell) {
        if (scope) {
          return this.column.renderCell(h, {
            value: scope.row[scope.column['property']],
            row: scope.row,
            index: scope.$index,
            column: scope.column,
            store: scope.store
          })
        } else {
          return this.column.renderCell(h)
        }
      } else if (this.column.formatter) {
        return h('span',
          this.column.formatter({row: scope.row, column: scope.column, value: scope.row[scope.column['property']]}))
      } else {
        let value = scope.row[scope.column['property']]
        if (this.column.formProps && this.column.formProps.options) {
          let rows = this.column.formProps.options
          let labelField = 'label'
          let valueField = 'value'
          if (['table', 'tree'].includes(this.column.formProps.type)) {
            labelField = this.column.formProps.props ? (this.column.formProps.props.labelField || 'name') : 'name'
            valueField = this.column.formProps.props ? (this.column.formProps.props.valueField || 'id') : 'id'
          }
          value = Array.isArray(value) ? value : [value]
          if (this.column.formProps.type === 'table') {
            rows = this.column.formProps.options.rows
          } else if (this.column.formProps.type === 'tree') {
            rows = this.$utils.flatObject(this.column.formProps.options)
          }
          value = rows
            .filter((row) => value.includes(row[valueField]))
            .map((row) => row[labelField] || row.id).join(',')
        }
        return h('span', value)
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
