<!--Created by 熊超超 on 2019-07-04.-->
<template>
  <el-upload ref="upload" :class="{disabled: disabled}" :action="action"
             :data="upLoadData"
             :limit="limit"
             :disabled="disabled"
             :before-upload="beforeUpload"
             :on-preview="onPreview"
             :file-list="fileList"
             :on-success="onSuccess"
             :on-remove="onRemove"
             :on-error="onError">
    <el-button v-if="!disabled" size="small" type="primary" :loading="loading">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      <span v-for="(item, index) in mUploadTip" :key="index">{{item}}</span>
    </div>
  </el-upload>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Base64 } from 'js-base64'

const ssoSignUrl = '/api/oss/getTemporarySign'
const saveUrl = '/api/attach/save'

export default @Component class CcUpload extends Vue {
  /* vue-props */
  @Prop({required: true, default: () => []}) value
  @Prop({required: true}) dir
  @Prop() uploadTip
  @Prop(Boolean) disabled
  @Prop(Number) limit
  @Prop({type: Boolean, default: false}) callback
  @Prop({type: Number, default: 100}) maxSize
  @Prop({type: Array, default: () => []}) fileType
  @Prop({type: Array, default: () => ['exe', 'reg', 'bat', 'msi']}) blackList
  /* vue-vuex */
  /* vue-data */
  action = ''
  expire = 0
  upLoadData = {}
  loading = false
  /* vue-compute */
  get fileList () {
    return this.value.map(item => ({ ...item, name: item.name || item.attachName }))
  }
  get mUploadTip () {
    const re = []
    if (this.fileType.length) {
      re.push(`只能上传 ${this.fileType.join('、')} 格式的文件`)
    }
    re.push(`每个文件大小不超过 ${this.maxSize} MB`)
    if (this.limit) {
      re.push(`最多可以上传 ${this.maxSize} 个文件`)
    }
    return re
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  beforeUpload (file) {
    const extName = file.name.substr(file.name.lastIndexOf('.') + 1)
    // 黑名单检查
    if (this.blackList.includes(extName)) {
      this.$message.error('上传失败，您上传的文件可能存在安全隐患，系统禁止上传')
      return false
    }
    // 文件个数检查
    if (this.limit && this.fileList.length >= this.limit) {
      this.$message.error(`上传失败，您最多可以上传 ${this.maxSize} 个文件`)
      return false
    }
    // 文件类型检查
    if (this.fileType.length && !this.fileType.includes(extName)) {
      this.$message.error(`上传失败，您只能上传${this.fileType.join('、')}格式的文件`)
      return false
    }
    // 文件大小检查
    if (file.size / 1024 / 1024 > this.maxSize) {
      this.$message.error(`上传失败，您上传的文件大小不能超过 ${this.maxSize} MB!`)
      return false
    }
    this.loading = true
    return this.getSign(file)
  }
  onPreview (file) {
    if (file.attachUrl) {
      this.$utils.toLink(file.attachUrl)
    }
  }
  async onSuccess (res, file) {
    // callback为true，oss服务器会调用应用服务器接口保存图片，并将响应数据返回给前端
    // 为false则由前端请求应用服务器保存附件
    if (this.callback) {
      this.loading = false
      if (typeof res === 'object' && res.status === 200) {
        file = { ...file, ...res.data }
        this.fileList.push({ name: file.name, ...res.data })
        this.$emit('input', this.fileList)
      } else {
        // 上传失败，删除fileList
        this.$refs['upload'].clearFiles()
        this.$emit('input', this.fileList)
        const msg = typeof res === 'string' ? '服务器异常，请稍候重试' : res.desc
        this.$message.error('上传失败：' + msg)
      }
    } else {
      const { data, error } = await this.$store.dispatch('requestUrl',
        {
          method: 'post',
          url: saveUrl,
          params: {attachName: file.name, attachPath: this.upLoadData['key']}
        })
      this.loading = false
      if (data) {
        file = { ...file, ...data }
        this.fileList.push({ name: file.name, ...data })
        this.$emit('input', this.fileList)
      } else {
        // 上传失败，删除fileList
        this.$refs['upload'].clearFiles()
        this.$emit('input', this.fileList)
        const msg = typeof res === 'string' ? '服务器异常，请稍候重试' : error.message
        this.$message.error('上传失败：' + msg)
      }
    }
  }
  onError (err) {
    this.loading = false
    this.$message.error('上传失败：' + (typeof err === 'string' ? err : (err.message || '服务器异常')))
  }
  onRemove (file) {
    const index = this.fileList.findIndex(item => item.attachId && item.attachId === file.attachId)
    this.fileList.splice(index, 1)
    this.$emit('input', this.fileList)
  }
  async getSign (file) {
    const extName = file.name.substr(file.name.lastIndexOf('.'))
    // 签名过期才重新签名，+3秒作为缓冲，抵消网络请求的延时
    const now = new Date().getTime() / 1000 + 3
    if (now > this.expire) {
      const {data} = await this.$store.dispatch('requestUrl',
        {
          method: 'get',
          url: ssoSignUrl,
          params: { dir: this.dir + '/' }
        })
      if (data) {
        this.expire = data.expire
        this.action = data.host
        this.upLoadData = {
          'policy': data.policy,
          'OSSAccessKeyId': data.accessid,
          'success_action_status': '200',
          'callback': this.callback ? data.callback : '',
          'signature': data.signature,
        }
      } else {
        return Promise.reject(new Error('上传失败'))
      }
    }
    this.upLoadData['key'] = this.dir + '/' + this.$utils.getUUID() + extName
    this.upLoadData['Content-Disposition'] = 'attachment;filename=' + file.name // 设置下载的时候的文件名
    if (this.callback) {
      this.upLoadData['x:origin_name'] = Base64.encode(file.name) // 自定义参数必须是x:开头且必须为小写
    }
    return Promise.resolve()
  }
}
</script>

<style lang="scss" scoped>
  .el-upload__tip{
    line-height: 1.5;
    display: flex;
    flex-direction: column;
  }
  .disabled/deep/ {
    .el-upload--text, .el-upload__tip{
      display: none;
    }
    .el-upload-list__item:first-child{
      margin-top: 4px;
    }
  }
</style>
