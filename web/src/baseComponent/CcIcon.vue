<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <svg :class="svgClass" :style="styleObj" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CcIcon extends Vue {
  @Prop({required: true, type: String}) name
  @Prop(String) className
  @Prop({type: Number, default: 0}) rotate
  @Prop({type: [String, Number], default: 24}) size

  get svgClass () {
    return ('svg-icon ' + (this.className || '')).trim()
  }
  get iconName () {
    return `#icon-${this.name}`
  }

  get styleObj () {
    return {
      transform: `rotate(${this.rotate}deg)`,
      fontSize: `${this.size}px`
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
