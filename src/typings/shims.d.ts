declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 粗暴的使用没有.d.ts文件的第三方库，后期应该扩展
declare module 'v-charts/*' {
  const vChart: any
  export default vChart
}
declare module 'vue-progressbar' {
  const obj: any
  export default obj
}

declare module 'vuedraggable' {
  const vuedraggable: any
  export default vuedraggable
}

declare module 'vue-grid-layout' {
  const VueGridLayout: {GridLayout: any, GridItem: any}
  export default VueGridLayout
}
