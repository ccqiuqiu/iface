import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class BaseVue extends Vue {
  protected aaa: string = '222'
}
