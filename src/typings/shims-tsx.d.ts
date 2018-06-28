import Vue, { VNode } from 'vue'
import {DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition} from 'vue/types/options'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// JSX使用大写字母开头的自定义的组件时，自定义的属性和方法会报类似这样的异常 Property 'user' does not exist on type 'ComponentOptions<Vue, DefaultData<Vue>..'
// 所以扩展ComponentOptions接口支持任意的属性和方法
declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps> {
    [propName: string]: any
  }
}
