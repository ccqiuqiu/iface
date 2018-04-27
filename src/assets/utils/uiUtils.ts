/**
 * Created by 熊超超 on 2018/4/27.
 */
import { Message } from 'element-ui'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export const message = (message: string, type: MessageType = 'success') => {
  Message({message, type})
}
