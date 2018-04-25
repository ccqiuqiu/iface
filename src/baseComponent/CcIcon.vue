<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class CcIcon extends Vue {
    @Prop({required: true}) private name!: string
    @Prop() private className!: string

    get svgClass() {
      return ('svg-icon ' + (this.className || '')).trim()
    }
    get iconName() {
      return `#icon-${this.name}`
    }
  }
</script>

<style lang="less" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>