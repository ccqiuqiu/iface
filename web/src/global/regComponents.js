/**
 * Created by 熊超超 on 2018/5/29.
 */
import CcTable from '../baseComponent/CcTable.vue'
import CcButton from '../baseComponent/CcButton.vue'
import CcForm from '../baseComponent/CcForm.vue'
import CcFormDynamic from '../baseComponent/CcFormDynamic.vue'
import CcCrud from '../baseComponent/CcCrud.vue'
import CcCrudTree from '../baseComponent/CcCrudTree.vue'
import VueProgressBar from 'vue-progressbar'
// import VeLine from 'v-charts/lib/line'
// import VeHistogram from 'v-charts/lib/histogram'
// import VePie from 'v-charts/lib/pie'
// import VeRing from 'v-charts/lib/ring'
// import VeFunnel from 'v-charts/lib/funnel'
// import VeRadar from 'v-charts/lib/radar'
// import VeMap from 'v-charts/lib/map'
// import VeChart from 'v-charts/lib/chart'
import VCharts from 'v-charts'
import CcChart from '../baseComponent/CcChart.vue'

export default {
  install (Vue) {
    Vue.use(VCharts)
    Vue.component('cc-table', CcTable)
    Vue.component('cc-button', CcButton)
    Vue.component('cc-form', CcForm)
    Vue.component('cc-crud', CcCrud)
    Vue.component('cc-crud-tree', CcCrudTree)
    Vue.component('cc-form-dynamic', CcFormDynamic)
    Vue.component('cc-chart', CcChart)
    // Vue.component(VeLine.name, VeLine)
    // Vue.component(VeHistogram.name, VeHistogram)
    // Vue.component(VePie.name, VePie)
    // Vue.component(VeRing.name, VeRing)
    // Vue.component(VeFunnel.name, VeFunnel)
    // Vue.component(VeRadar.name, VeRadar)
    // Vue.component(VeMap.name, VeMap)
    // Vue.component(VeChart.name, VeChart)
    Vue.use(VueProgressBar, {
      color: '#93ccf8',
      failedColor: '#F56C6C'
    })
  }
}
