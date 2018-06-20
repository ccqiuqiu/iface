<!--Created by 熊超超 on 2018/5/21.-->
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class CcRender extends Vue {
    @Prop(Function) private renderFun: any
    @Prop() private scope?: any

    private render(h: any) {
      const scope = this.scope
      if (scope) {
        return this.renderFun(h, scope.row, scope.$index, scope.column, scope.store)
      } else {
        return this.renderFun(h)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>