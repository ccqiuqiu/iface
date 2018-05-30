/**
 * Created by 熊超超 on 2018/5/29.
 */
import CcTable from '../baseComponent/CcTable.vue'
import CcButton from '../baseComponent/CcButton.vue'
import VeLine from 'v-charts/lib/line'
import VueProgressBar from 'vue-progressbar'

export default {
  install(Vue: any): void {
    Vue.component('cc-table', CcTable)
    Vue.component('cc-button', CcButton)
    Vue.component(VeLine.name, VeLine)
    Vue.use(VueProgressBar)
  },
}
