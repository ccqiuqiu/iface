<!--Created by 熊超超 on 2019-07-04.-->
<template>
  <div>
    <el-upload v-if="!disabled" action
               :before-upload="beforeUpload"
               :on-preview="onPreview"
               :file-list="fileList"
               :on-success="onSuccess"
               :on-remove="onRemove"
               :on-error="onError"
               :http-request="upload">
      <el-button v-if="!disabled" size="small" type="primary" :loading="loading">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{uploadTip}}</div>
    </el-upload>
    <div v-else>
      <div :key="index" v-for="(item, index) in fileList">
        <a target="_blank" :download="item.attachName" :href="item.attachUrl">{{item.attachName}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import OSS from 'ali-oss'
const ssoClient = new OSS({
  accessKeyId: 'LTAIMtYRSTaAQ70n',
  accessKeySecret: 'xLjQ9j8jsTtefwKdsFpEWikzAncZEc',
  bucket: 'oppcio-gcgl-test',
  region: 'oss-cn-shenzhen',
})
export default @Component class CcUpload extends Vue {
  /* vue-props */
  @Prop({required: true, default: () => []}) value
  @Prop() uploadTip
  @Prop(Boolean) disabled
  @Prop(Boolean) loading
  @Prop({type: Number, default: 100}) maxSize
  @Prop({type: Array, default: () => []}) fileType
  @Prop({type: Array, default: () => ['exe', 'reg', 'bat', 'msi']}) blackList
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get fileList () {
    return this.value// .map(item => ({...item, name: item.name || item.attrName}))
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  beforeUpload (file) {
    const extName = file.name.substr(file.name.lastIndexOf('.') + 1)
    // 黑名单检查
    if (this.blackList.includes(extName)) {
      this.$message.error('上传失败，您上传的文件格式不允许！')
      return false
    }
    // 文件类型检查
    if (this.fileType.length && !this.fileType.includes(extName)) {
      this.$message.error(`上传失败，只能上传${this.fileType.join('、')}格式的文件`)
      return false
    }
    // 文件大小检查
    if (file.size / 1024 / 1024 > this.maxSize) {
      this.$message.error(`上传文件大小不能超过 ${this.maxSize} MB!`)
      return false
    }
    return true
  }
  onPreview (file) {
    if (file.attachUrl) {
      this.$utils.toLink(file.attachUrl)
    }
  }
  onSuccess (file) {
    console.log('success')
    this.fileList.push(file)
    this.$emit('input', this.fileList)
  }
  onRemove (file) {
    const index = this.fileList.findIndex(item => item.attachId && item.attachId === file.attachId)
    this.fileList.splice(index, 1)
  }
  onError (err) {
    console.log(err)
  }
  async upload (config) {
    console.log(config)
    let file = config.file
    const extName = file.name.substr(file.name.lastIndexOf('.'))
    let fileNames = this.$utils.getUUID() + extName
    let encodeFileName = encodeURIComponent(file.name)
    // 上传到oss
    let re = await ssoClient.multipartUpload('order/' + fileNames, file, {
      headers: {'Content-Disposition': 'attachment;filename=' + encodeFileName},
      progress: async function (p) {
        let e = {}
        e.percent = p * 100
        config.onProgress(e)
      },
    })
    if (re.res.status === 200) {
      // todo 保存到服务器
      //
      let fileObj = {
        attachName: file.name,
        name: file.name,
        attachUrl: re.name,
        attachId: this.$utils.getUUID() // 此处应该是接口返回
      }
      config.onSuccess(fileObj)
    } else {
      config.onError()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
