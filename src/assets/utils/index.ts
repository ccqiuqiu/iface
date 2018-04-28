/**
 * Created by 熊超超 on 2018/4/27.
 */
import {MessageType} from '@utils/uiUtils'

export * from './uiUtils'
export * from './utils'

// 定义Utils接口， 所有的工具类最好在这个接口定义一下
export interface Utils {
  message: (message: string, type?: MessageType) => void,
  flatObject: <T extends TT>(source: T[], children?: string) => T[],
  [propName: string]: any
}
