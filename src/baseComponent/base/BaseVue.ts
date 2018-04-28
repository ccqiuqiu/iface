import Vue from 'vue'
import Component from 'vue-class-component'
import * as utils from '@utils/index'
import {Utils} from '@utils/index'

@Component
export default class BaseVue extends Vue {
  protected utils: Utils = utils
}
