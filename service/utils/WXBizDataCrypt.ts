import * as crypto from 'crypto'


export default class WXBizDataCrypt {
  appId: string
  sessionKey: string

  constructor(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
  }

  public decryptData(encryptedData, iv) {
    // base64 decode
    const sessionKey: Buffer = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
      // 解密
      const decipher: any = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      let decoded: any = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')

      decoded = JSON.parse(decoded)

      if (decoded.watermark.appid !== this.appId) {
        return null
      }

      return decoded

    } catch (err) {
      return null
    }
  }
}

