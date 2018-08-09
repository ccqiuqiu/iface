// 封装通用的响应数据
export default function(data: any = {}, success: boolean = true, message: string | {code: string, message: string} = '') {
  const re: any = {
    success,
    data,
  }
  if (!success) {
    if (typeof message === 'string') {
      re.error = {message}
    } else {
      re.error = message
    }
  }
  return re
}
