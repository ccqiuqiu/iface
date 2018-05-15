/**
 * Created by 熊超超 on 2018/4/27.
 */
import { Message } from 'element-ui'

import {EnumMessageType} from '@utils/constant'
import {MessageType} from '@/typings/vue'

// 消息框简单封装
export const message = (message: string, type: MessageType = EnumMessageType.SUCCESS) => {
  Message({message, type})
}
