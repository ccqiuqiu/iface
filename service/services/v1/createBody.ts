// 封装通用的响应数据
export default function(data = {}, success = true, message: string | {code, message} = '') {
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
