import Vue from 'vue'
import Component from 'vue-class-component'
import * as utils from '@utils/index'

@Component
export default class BaseVue extends Vue {
  protected utils: any = utils
}
