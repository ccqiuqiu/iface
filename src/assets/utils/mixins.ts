/**
 * Created by 熊超超 on 2018/6/21.
 */
import { Component, Vue } from 'vue-property-decorator'

@Component
export class PageMixin extends Vue {
  protected mixinValue: string = 'Hello'
}
